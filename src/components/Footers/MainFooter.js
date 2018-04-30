import React from 'react';
import './MainFooter.css';
import {Link} from 'react-router-dom';

export default function MainFooter(){
    return(
        <div className='footerSection'>
            <section className='footerSectionContentContainerWrapper'>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>ArrowSnap</h3> 
                       <Link to='/'>Products</Link>
                       <Link to='/about'>What We Do</Link>
                    </div>
                    <div>
                       <h3>About</h3> 
                       <Link to='/about'>Our Story</Link>
                       <Link to='/support'>Contact Us</Link>
                       <Link to='/about'>Careers</Link>
                    </div>
                </div>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Community</h3> 
                       <Link to='/community'>How We Get Involved</Link>
                    </div>
                    <div>
                       <h3>Support</h3> 
                       <Link to='/support'>Report An Issue</Link>
                    </div>
                </div>
                <div className='footerSectionContentContainer'>
                    <div>
                       <h3>Products</h3> 
                       <Link to='/'>See What's New</Link>
                    </div>
                    <div>
                       <h3>Terms and Agreements</h3> 
                       <Link to='/terms'>Terms Of Use</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}