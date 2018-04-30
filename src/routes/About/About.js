import React, { Component } from 'react';
import './About.css'


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
                <p>Our goal is to provide customers with easy access to products of every type. Shop when you want, how you want with our intuitive customer interface. We pride ourselves on customer satisfaction and ease of use. All products purchased on arrowsnap.com help contribute to charity organizations around the world. Find out more <span><Link to='/community'>here</Link></span>.</p>
            </section>
        );
    }
}


export default About;