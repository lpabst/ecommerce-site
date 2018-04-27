import React, { Component } from 'react';
import './UnderConstruction.css'

import MainHeader from './../../components/Headers/MainHeader.js';

class UnderConstruction extends Component {
    render() {
        return (
            <section className='routeWrapper'>
            
                <MainHeader/>

                <div className='constructionContent'>
                    <p className='constructionWords' >This page is currently under construction. Thank you for your patience!</p>
                    <img className='fullScreenImg' src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="construction worker"/>
                </div>
                
            </section>
        );
    }
}

export default UnderConstruction;