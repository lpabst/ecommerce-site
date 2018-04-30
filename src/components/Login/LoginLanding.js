import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './LoginLanding.css';


class LoginLanding extends Component {
  constructor(props){
    super(props)

    this.state = {
      usernameInput: '',
      passwordInput: '',
      adminLogin: false
    }
    
    this.login = this.login.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  login(){
    axios.post(`/api/login`, {"username":this.state.usernameInput, "userpassword":this.state.passwordInput})
    .then( res => {
      if (res.data.error && res.data.message){
        alert(res.data.message);
      }else if (!res.data.response || !res.data.response[0] || res.data.error){
        alert('We encountered an unexpected error, please try again');
      }
      else if(res.data.response[0].isadmin){
        this.setState({
          adminLogin: true,
          usernameInput: '',
          passwordInput: ''
        })
        this.props.updateIsAdmin(true, res.data.response[0].firstname);
      } else if (res.data.length && !res.data.response[0].isadmin) {
        this.setState({
          adminLogin: false,
          usernameInput: '',
          passwordInput: ''
        })
        this.props.updateIsAdmin(false, res.data.response[0].firstname)
      }
      if(res.data.length){
        this.props.updateShowLogin();
        this.props.updateCart();
      }
    })   
  }

  handleUsernameInput(e){
    this.setState({
      usernameInput: e.target.value
    })
  }
  handlePasswordInput(e){
    this.setState({
      passwordInput: e.target.value
    })
  }

  render() {

    let loginLandingSectionStyle = !this.props.showLogin ?
      {"height": "0px","padding": "0px", "left":"100%"}:
      {"height": "fit-content","padding": "30px","left":"0%"};

    return (
      <section className='loginWrapper'>
        <div style={loginLandingSectionStyle} id="loginLandingSection">
          <div>
            <h1>Enter Email</h1>
            <input value={this.state.usernameInput} onChange={this.handleUsernameInput} type="text"/>
            <br/>
            <h1>Enter Password</h1>
            <input value={this.state.passwordInput} onChange={this.handlePasswordInput} type="text"/>
            <button onClick={this.login}>Login</button>
            <Link to='/signup' style={{marginLeft: '10px'}}><button>Sign Up</button></Link>
            <br/>
          </div>
        </div>
      </section>
    );
  }
}


export default LoginLanding;