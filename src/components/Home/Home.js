import React, { Component } from 'react';
import MainHeader from './../Headers/MainHeader.js';
import LandingVideo from './../LandingVideo/LandingVideo.js';
import LandingTeaserStories from './../Landing/LandingTeaserStories.js';
import LandingFeaturedProducts from './../Landing/LandingFeaturedProducts.js';
import LandingMoreStories from './../Landing/LandingMoreStories.js';
import MainFooter from './../Footers/MainFooter.js';

import './Home.css';


class Home extends Component {

  render() {
    return (
      <div className="home">

          <MainHeader/>
          <LandingVideo/>
          <LandingTeaserStories/>
          <LandingFeaturedProducts/>
          <LandingMoreStories/>
          <MainFooter/>

      </div>
    );
  }
}


export default Home;