import React from 'react';
import './MainFooter.css';

export default function MainFooter(){
    return(
        <div className='footerSection'>
            <section className='footerSectionContentContainerWrapper'>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>ArrowSnap</h3> 
                       <h1>Products</h1>
                       <h1>What We Do</h1>
                    </div>
                    <div>
                       <h3>About</h3> 
                       <h1>Our Story</h1>
                       <h1>Contact Us</h1>
                       <h1>Careers</h1>
                    </div>
                </div>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Community</h3> 
                       <h1>How We Get Involved</h1>
                    </div>
                    <div>
                       <h3>Support</h3> 
                       <h1>Report An Issue</h1>
                    </div>
                </div>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Blog</h3> 
                       <h1>Keep Up With What's New</h1>
                    </div>
                    <div>
                       <h3>Terms and Agreements</h3> 
                       <h1>Terms Of Use</h1>
                    </div>
                </div>
            </section>
        </div>
    )
}