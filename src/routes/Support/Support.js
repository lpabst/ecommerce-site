import React, { Component } from'react';
import './Support.css';

import MainHeader from './../../components/Headers/MainHeader.js';
import MainFooter from './../../components/Footers/MainFooter.js';

import axios from 'axios';


class Support extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: ``,
            issue: ``,
            errorMessage: '',
            issueSubmitted: false,
            errorSubmittingIssue: false,
        }

        this.submitIssue = this.submitIssue.bind(this);
        this.resetPage = this.resetPage.bind(this);
    }

    submitIssue(){
        let {email, issue} = this.state;

        if (!issue){
            return this.setState({errorMessage: 'Please tell us a little bit about the issue you are seeing'})
        }

        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return this.setState({errorMessage: 'That email address appears to be invalid'})
        }

        axios.post(`/api/supportTicket`, {
            email: this.state.email,
            issue: this.state.issue
        })
        .then( res => {
            this.setState({
                issueSubmitted: true
            })
        }).catch(err => {
            this.setState({
                errorSubmittingIssue: true
            })
        })
    }

    resetPage(){
        this.setState({
            email: ``,
            issue: ``,
            errorMessage: '',
            issueSubmitted: false,
            errorSubmittingIssue: false,
        })
    }

    render() {
        return (
            <section className={`routeWrapper`}>
                
                < MainHeader />

                <div className='clCartHeader'>
                    <h1>Support</h1>
                </div>   

                <div className='support_fullscreen_background'>

                    {/* Might be nice to add a full page background image of some kind here */}
                    
                    { this.state.issueSubmitted && 
                        <div className={`supportModal successModal`}>
                            <p>Your support ticket has successfully been submitted. We will contact you soon with a resolution. In the meantime, know that we are working hard to resolve your concerns.</p>
                            <button onClick={this.resetPage} >Submit Another Concern</button>
                        </div>
                    }

                    { this.state.errorSubmittingIssue && 
                        <div className={`supportModal errorModal`}>
                            <p>We encountered an unexpected error. Please try again or you can email us directly at followthisup@gmail.com</p>
                            <button onClick={this.resetPage} >Try Again</button>
                        </div>
                    }

                    { !this.state.issueSubmitted && !this.state.errorSubmittingIssue &&
                        <div className={`supportModal normalModal`}>
                            <p>We`re here to help you. Send us a message any time, day or night, and know that we`re working hard to resolve your concerns</p>
                            <p className='errorMessage' >{this.state.errorMessage}</p>
                            <input placeholder={`your email`} onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} />
                            <textarea placeholder={`type your concern here...`} onChange={(e) => this.setState({issue: e.target.value})}  value={this.state.issue} />
                            <button onClick={this.submitIssue} >Submit</button>
                        </div>
                    }

                </div>

                <MainFooter/>

            </section>
        );
    }
}


export default Support;