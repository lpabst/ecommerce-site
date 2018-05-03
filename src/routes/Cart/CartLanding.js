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

    this.getProductsInCart = this.getProductsInCart.bind(this); 
    this.adjustQuantity = this.adjustQuantity.bind(this);
  }

  componentDidMount() {
    this.getProductsInCart();
  }

  getProductsInCart(){
    axios.get(`/api/getProductsInCart`)
      .then(res => {
        this.setState({ productsInCart: res.data })
      })
  }

  // adjusts quantity in cart up or down 1 depending on what the user clicks (+/-), then updates the DB
  adjustQuantity(i, incrementer, removeFromUsersCart){
    let productsInCart = JSON.parse(JSON.stringify(this.state.productsInCart));
    let newProductInfo = productsInCart[i];
    newProductInfo.quantity = removeFromUsersCart ? 0 : newProductInfo.quantity + incrementer;

    axios.post('/api/adjustQuantity', newProductInfo)
    .then( res => {
      if (!res.data || res.data.error){
        alert('Encountered an unexpected error. Support has been notified, please try again later');
      }else{
        this.getProductsInCart();
      }
    })
    .catch(err => console.log(err));
  }

  // remove $ and commas, then multiply price*qnt and return it formatted for the locale
  productTotal(price, qnt){
    price = price.replace('$', '');
    price = parseFloat(price.split(',').join(''))
    let total = price * qnt;
    
    return total
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
    
    return total
  }

  render() {

    let productsInCart = this.state.productsInCart.length ?
      this.state.productsInCart.map((product, i) => {
        let total = this.productTotal(product.price, product.quantity)
        return (
          <div className='clContentSingleItem' key={i}>
            <div  className='clCart1' >
              <img src={product.image} alt=""/>
            </div>
            <div className='clCart2' >
              <p>
                {product.title}
                <span className='clCart2Remove' onClick={()=>this.adjustQuantity(i, null, true)} >Remove From Cart</span>
              </p>
            </div>
            <div className='clCart3' >${product.price}</div>
            <div className='clCart4' >
              <p>{product.quantity}</p>
              <p className='clCart4Plus' onClick={()=>this.adjustQuantity(i, 1, false)} >+</p>
              <p className='clCart4Minus' onClick={()=>this.adjustQuantity(i, -1, false)} >-</p>
            </div>
            <div className='clCart5' >${(total.toFixed(2)).toLocaleString()}</div>
          </div>          
        )
      }): null;

    let subTotal = this.state.productsInCart.length ? this.orderTotal() :'0.00';

    return (
      <section className="">

        <MainHeader getProductsInCart={this.getProductsInCart} />

        <div className='clCartHeader'>
          <h1>Shopping Cart</h1>
        </div>   

        <section className='clContentSection'>
          <div className='clContentWrapper'>
            <div className='clContentDescriptionHeader'>
              <h1 className='clCart1' > </h1>
              <h1 className='clCart2' >Product</h1>
              <h1 className='clCart3' >Price</h1>
              <h1 className='clCart4' >Quantity</h1>
              <h1 className='clCart5' >Total</h1>
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
                  <h1>${subTotal.toLocaleString()}</h1>    
                  <h1>${((subTotal*.065).toFixed(2)).toLocaleString()}</h1>    
                  <h1>$0.00</h1>    
                  <h3>${((subTotal*1.065).toFixed(2)).toLocaleString()}</h3>
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