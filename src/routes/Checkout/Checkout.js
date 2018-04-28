import React, { Component } from 'react';
import axios from 'axios';
import MainHeader from './../../components/Headers/MainHeader.js';
import MainFooter from './../../components/Footers/MainFooter.js';
import './Checkout.css'


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsInCart: [],
            name: '',
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
            nameOnCard: '',
            cardNumber: '',
            cardExpires: '',
            cardSecurityCode: '',
        }

        this.getProductsInCart = this.getProductsInCart.bind(this);
    }

    componentDidMount() {
        this.getProductsInCart();
    }

    getProductsInCart() {
        axios.get(`/api/getProductsInCart`)
            .then(res => {
                this.setState({ productsInCart: res.data })
            })
    }

    // go through the products in the cart, get the price for each product, remove $ and commas, multiply by qnt, 
    // then add it to the running total. at the end, format based on locale
    orderTotal() {
        let arr = this.state.productsInCart;
        let total = 0;

        for (let i = 0; i < arr.length; i++) {
            let price = arr[i].price.replace('$', '');
            price = parseFloat(price.split(',').join(''));
            total += (price * arr[i].quantity);
        }

        return total.toLocaleString();
    }

    render() {

        let subTotal = this.state.productsInCart.length ? this.orderTotal() : '0.00';

        return (
            <section className='routeWrapper'>

                <MainHeader getProductsInCart={this.getProductsInCart} />

                <div className='clCartHeader'>
                    <h1>Checkout</h1>
                </div>

                <div className='clCheckoutSection'>
                    <div className='clCheckoutWrapperRight'>
                        <div>
                            <h1>Subtotal</h1>
                            <h1>Tax</h1>
                            <h1>Shipping</h1>
                            <h3>Order Total</h3>
                        </div>
                        <div>
                            <h1>${subTotal}</h1>
                            <h1>${(subTotal * .065).toFixed(2)}</h1>
                            <h1>$0.00</h1>
                            <h3>${(subTotal * 1.065).toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                <div className='personalInfo'>
                    <p>Shipping Info</p>
                    <input placeholder='Name' value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} />
                    <input placeholder='Street Address' value={this.state.streetAddress} onChange={(e)=>this.setState({streetAddress: e.target.value})} />
                    <input placeholder='City' value={this.state.city} onChange={(e)=>this.setState({city: e.target.value})} />
                    <input placeholder='State' value={this.state.state} onChange={(e)=>this.setState({state: e.target.value})} />
                    <input placeholder='Zip' value={this.state.zip} onChange={(e)=>this.setState({zip: e.target.value})} />
                </div>

                <div className='paymentInfo'>
                    <p>Payment Info</p>
                    <input placeholder='Name on card' value={this.state.nameOnCard} onChange={(e)=>this.setState({nameOnCard: e.target.value})} />
                    <input placeholder='Card Number' value={this.state.cardNumber} onChange={(e)=>this.setState({cardNumber: e.target.value})} />
                    <input placeholder='Expiration Date' value={this.state.cardExpires} onChange={(e)=>this.setState({cardExpires: e.target.value})} />
                    <input placeholder='3 Digit Card Security Code' value={this.state.cardSecurityCode} onChange={(e)=>this.setcardSecurityCode({state: e.target.value})} />
                </div>

                <div className='submitPaymentDiv'>
                    <button className='submitPaymentBtn'>Submit Payment</button>
                </div>

                <MainFooter />

            </section>
        );
    }
}


export default Checkout;