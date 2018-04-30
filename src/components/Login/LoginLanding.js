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
      }else if (!res.data.user || !res.data.user[0] || res.data.error){
        alert('We encountered an unexpected error, please try again');
      } else if(res.data.user){
        let {firstname, isadmin} = res.data.user[0];
        
        this.setState({adminLogin: isadmin, usernameInput: '', passwordInput: ''})
        this.props.updateIsAdmin(isadmin, firstname);
        this.props.updateShowLogin();
        this.props.updateCart();

        // If user just sign up, or is on the sign in page, navigate them to the products page (if the products nav link also exists)
        if (window.location.href.match(/signup/) && document.querySelector('#root > div > section > section:nth-child(1) > div > div.flexRow.desktopNav > a:nth-child(1)')){
          document.querySelector('#root > div > section > section:nth-child(1) > div > div.flexRow.desktopNav > a:nth-child(1)').click();
        }
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
            <input value={this.state.passwordInput} onChange={this.handlePasswordInput} type="password"/>
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