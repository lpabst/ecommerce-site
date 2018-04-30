import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css'

import MainHeader from './../../components/Headers/MainHeader.js';
import MainFooter from './../../components/Footers/MainFooter.js';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorMessage: '',
            successMessage: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPasswordText: false,
        }

        this.createAccount = this.createAccount.bind(this);
    }

    // validates field, then sends info to back end for re-validation and to create the new account
    createAccount(){
        let {email, password, confirmPassword, firstName, lastName} = this.state;

        if (!firstName || !lastName){
            return this.setState({errorMessage: 'Please provide your first and last name'})
        }

        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return this.setState({errorMessage: 'Please enter a valid email address'})
        }

        if (!password || password.length < 8){
            return this.setState({errorMessage: 'Your password must be at least 8 characters long'})
        }

        if (!password.match(/[A-Z]/)){
            return this.setState({errorMessage: 'Your password must contain at least 1 UPPERCASE Letter'})
        }

        if (!password.match(/[a-z]/)){
            return this.setState({errorMessage: 'Your password must contain at least 1 lowercase Letter'})
        }

        if (password !== confirmPassword){
            return this.setState({errorMessage: 'Passwords do not match. Please confirm your password in the Confirm Password box'})
        }

        this.setState({
            errorMessage: '',
            successMessage: 'Creating Account...'
        })

        let createAccountData = {email, password, confirmPassword, firstName, lastName};

        axios.post('/api/createAccount', createAccountData)
        .then( res => {
            if (res.data.error){
                console.log(res.data);
                return this.setState({
                    errorMessage: res.data.message,
                    successMessage: '',
                })
            }else{
                return this.setState({
                    successMessage: 'Success! You will receive an email shortly to confirm your account',
                    errorMessage: '',
                });
            }
        })
        .catch( err => console.log(err))

    }

    render() {
        return (
            <section className={`routeWrapper`}>

                <MainHeader getProductsInCart={this.getProductsInCart} />

                <div className='clCartHeader'>
                    <h1>Sign Up</h1>
                </div>

                <section className={`signupPageContent`} >
                    <div className='signupModal'>
                        <h1>Email: <span className='smallDetails'>We'll send a confirmation email to this email address</span></h1>
                        <h1>Password: <span className='smallDetails'>Must be at least 8 characters long and must contain at least 1 UPPERCASE and 1 lowercase letter</span></h1>
                        <br/>

                        <p className='errorMessage' >{this.state.errorMessage}</p>
                        <p className='successMessage' >{this.state.successMessage}</p>

                        <div className='nameBox'>
                            <p>Name</p>
                            <input placeholder='First' value={this.state.firstName} onChange={(e)=>this.setState({firstName: e.target.value})} />
                            <input placeholder='Last' value={this.state.lastName} onChange={(e)=>this.setState({lastName: e.target.value})} />
                        </div>
                        <p>Email</p>
                        <input value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})} placeholder='Email' type='text' />
                        <p>Password</p>
                        <input value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})} placeholder='Password' type={this.state.showPasswordText ? 'text' : 'password'} />
                        <p>Confirm Password</p>
                        <input value={this.state.confirmPassword} onChange={(e)=>this.setState({confirmPassword: e.target.value})} placeholder='Confirm Password' type={this.state.showPasswordText ? 'text' : 'password'} />

                        <div className='showPasswordBox'>
                            <input type='checkbox' checked={this.state.showPasswordText} onChange={(e)=>this.setState({showPasswordText: !this.state.showPasswordText})} />
                            <p onClick={(e)=>this.setState({showPasswordText: !this.state.showPasswordText})} >Show Password Text</p>
                        </div>

                        <button onClick={() => this.createAccount()} >Create Account</button>
                    </div>
                </section>

                <MainFooter />

            </section>
        );
    }
}


export default Signup;