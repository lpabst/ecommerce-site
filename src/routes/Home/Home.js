import React, { Component } from 'react';
import MainHeader from './../../components/Headers/MainHeader.js';
import LandingVideo from './../../components/LandingVideo/LandingVideo.js';
import LandingTeaserStories from './../../components/Landing/LandingTeaserStories.js';
import LandingFeaturedProducts from './../../components/Landing/LandingFeaturedProducts.js';
import LandingMoreStories from './../../components/Landing/LandingMoreStories.js';
import MainFooter from './../../components/Footers/MainFooter.js';

import './Home.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="home">
          
          <MainHeader/>
          <LandingVideo/>
          <LandingTeaserStories/>
          <LandingFeaturedProducts/>
          <LandingMoreStories/>
          <MainFooter/>}

      </div>
    );
  }
}


export default Home;