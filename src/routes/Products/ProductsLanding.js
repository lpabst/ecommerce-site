import React, { Component } from 'react';
import MainHeader from './../../components/Headers/MainHeader.js';
import ProductsFilterHeader from './ProductsFilterHeader.js';
import ProductsLandingProducts from './ProductsLandingProducts.js';
import MainFooter from './../../components/Footers/MainFooter.js';


class ProductsLanding extends Component {
  constructor(props){
    super(props)

    this.state = {
      attributeToShow:'All'
    }
    
    this.updateAttributeToShow = this.updateAttributeToShow.bind(this);
  }

  updateAttributeToShow(val){
    this.setState({
      attributeToShow:val
    })
  }

  render() {
    return (
      <div className="home">

          <MainHeader/>
          <ProductsFilterHeader updateAttributeToShow={this.updateAttributeToShow}/>
          <ProductsLandingProducts attributeToShow={this.state.attributeToShow}/>
          <MainFooter/>

      </div>
    );
  }
}


export default ProductsLanding;