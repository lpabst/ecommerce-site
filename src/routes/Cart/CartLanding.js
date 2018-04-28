import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MainHeader from './../../components/Headers/MainHeader.js';
import MainFooter from './../../components/Footers/MainFooter.js';

import './CartLanding.css';


class CartLanding extends Component {
  constructor(props){
    super(props)

    this.state = {
      productsInCart:[]
    }
    // 
  }

  componentDidMount() {
    axios.get(`/api/getProductsInCart`)
      .then(res => {
        this.setState({
            productsInCart: res.data
        })
      })
  }

  // remove $ and commas, then multiply price*qnt and return it formatted for the locale
  productTotal(price, qnt){
    price = price.replace('$', '');
    price = parseFloat(price.split(',').join(''))
    let total = price * qnt;
    
    return total.toLocaleString();
  }

  // go through the products in the cart, get the price for each product, remove $ and commas, multiply by qnt, 
  // then add it to the running total. at the end, format based on locale
  orderTotal(){
    let arr = this.state.productsInCart;
    let total = 0;
    
    for(let i=0; i<arr.length; i++){
      let price = arr[i].price.replace('$', '');
      price = parseFloat(price.split(',').join(''));
      total += (price * arr[i].quantity);
    }
    
    return total.toLocaleString();
  }

  render() {

    let productsInCart = this.state.productsInCart.length ?
      this.state.productsInCart.map((product, i) => {
        let total = this.productTotal(product.price, product.quantity)
        return (
          <div className='clContentSingleItem' key={i}>
            <div style={{"width":"12%"}}>
              <img src={product.image} alt=""/>
            </div>
            <div style={{"width":"53%"}}>{product.title}</div>
            <div style={{"width":"10%"}}>{product.price}</div>
            <div style={{"width":"15%"}}>{product.quantity}</div>
            <div style={{"width":"10%"}}>${total}</div>
          </div>          
        )
      }): null;

    let subTotal = this.state.productsInCart.length ?
      this.orderTotal()
      :'0.00'

    return (
      <section className="">
        <MainHeader/>
        <div className='clCartHeader'>
          <h1>Shopping Cart</h1>
        </div>   
        <section className='clContentSection'>
          <div className='clContentWrapper'>
            <div className='clContentDescriptionHeader'>
              <h1 style={{"width":"12%"}}></h1>
              <h1 style={{"width":"53%"}}>Product</h1>
              <h1 style={{"width":"10%"}}>Price</h1>
              <h1 style={{"width":"15%"}}>Quantity</h1>
              <h1 style={{"width":"10%"}}>Total</h1>
            </div>
            { productsInCart }
            <div className='clCheckoutSection'> 
              <Link to='/products' className='clCheckoutWrapperLeft'>
                <h1>CONTINUE SHOPPING</h1>
              </Link>
              <div className='clCheckoutWrapperRight'>
                <div>
                  <h1>Subtotal</h1>      
                  <h1>Tax</h1>    
                  <h1>Shipping</h1>    
                  <h3>Order Total</h3>    
                </div>
                <div>
                  <h1>${subTotal}</h1>    
                  <h1>${(subTotal*.065).toFixed(2)}</h1>    
                  <h1>$0.00</h1>    
                  <h3>${(subTotal*1.065).toFixed(2)}</h3>
                </div>
              </div>
            </div>
            { this.state.productsInCart.length ?
                <div className='clCheckoutButton'><Link to='/checkout'>CHECKOUT</Link></div> 
              : null
            }
          </div>
        </section>
        <MainFooter/>
      </section>
    );
  }
}


export default CartLanding;