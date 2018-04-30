import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './About.css'

import MainHeader from './../../components/Headers/MainHeader.js';
import MainFooter from './../../components/Footers/MainFooter.js';

class About extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }

    }

    componentDidMount(){
        
    }

    render() {
        return (
            <section className='routeWrapper'>
                    
                < MainHeader />

                <div className='clCartHeader'>
                    <h1>About</h1>
                </div>   

                <div className='aboutSection aboutSection1'>
                    <div className='aboutWidget' >
                        <p>We provide customers with easy access to products of every type. Shop when you want, how you want with our intuitive customer interface. We pride ourselves on customer satisfaction and ease of use.</p>
                        <p>All products purchased on arrowsnap.com help contribute to charity organizations around the world. Find out more <span><Link to='/community'>here</Link></span>.</p>
                    </div>
                </div>

                <div className='aboutSection aboutSection2'>
                    <div>
                        <div className='planePic'>  
                            <img className='planePic' src='https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1464324495000/photosp/75865f74-e18a-4699-b4d0-ffeef0184204/stock-photo-sun-sky-arizona-clouds-aircraft-sunsets-airports-aa-phoenix-75865f74-e18a-4699-b4d0-ffeef0184204.jpg' alt='plane on tarmac' />
                        </div>
                        <div className='aboutWidget' >
                            <p>Free shipping on most orders means you won't waste money on shipping costs. No more worrying about choosing a shipping option or compromising quality for price!</p>
                        </div>
                    </div>
                </div>

                <MainFooter/>

            </section>
        );
    }
}


export default About;