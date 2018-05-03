import React, { Component } from 'react';
import axios from 'axios';
import './Checkout.css'

import MainHeader from './../../components/Headers/MainHeader.js';
import MainFooter from './../../components/Footers/MainFooter.js';

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
        this.placeOrder = this.placeOrder.bind(this);
        this.validateFields = this.validateFields.bind(this);
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

    placeOrder(){
        axios.get('/api/isLoggedIn')
        .then( res => {
            
            if (!res.data || !res.data.isLoggedIn){
                return alert('Please login to place an order');
            }

            let fieldsAreValid = this.validateFields();
    
            if (!fieldsAreValid){
                // this.validateFields alerts the user as to the problem, so here we can just return to end the function
                return;
            }
            
            // Perform payment with Stripe
            // Clear User's cart in the DB
            // navigate user to a thank you / payment confirmation page
        })
        .catch(err => {
            alert('Unexpected Error, please try again later')
        });
    }

    validateFields(){
        let {name, streetAddress, city, state, zip, nameOnCard, cardNumber, cardExpires, cardSecurityCode} = this.state;
        let visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
        let masterCardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
        let discoverCardPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
        let amexPattern = /^3[47][0-9]{13}$/;

        if (!name || !streetAddress || !city || !state || !zip || !nameOnCard || !cardNumber || !cardExpires || !cardSecurityCode){
            alert('Some fields were left blank. Please fill out all fields before submitting');
            return false;
        }
        if (!zip.match(/^\d{5}$/)){
            alert('Zip code is not valid');
            return false;
        }
        if (!cardNumber.match(visaPattern) && !cardNumber.match(masterCardPattern) 
        && !cardNumber.match(discoverCardPattern) && !cardNumber.match(amexPattern)){
            alert('Card number is not valid');
            return false;
        }
        if (!cardExpires.match(/^\d{2}\/\d{4}$/)){
            alert('Expiration date is not valid');
            return false;
        }else{
            let arr = cardExpires.split('/');
            let month = arr[0] ? parseInt(arr[0],10) : 0;
            let year = arr[1] ? parseInt(arr[1],10) : 0;

            let today  = new Date();
            let nowMonth = today.getMonth() + 1;
            let nowYear = today.getFullYear();

            if (year < nowYear){
                alert('Card is expired');
                return false;
            }else if(year === nowYear && month < nowMonth){
                alert('Card is expired');
                return false;
            }
        }
        if (!cardSecurityCode.match(/^\d{3}$/)){
            alert('Card CVV security code is not valid. This is a 3 digit number found on the back of your card.');
            return false;
        }

        return true;
    }

    // Validates and formats credit card number
    formatCardNum(num){
        let visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
        let masterCardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
        let discoverCardPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
        let amexPattern = /^3[47][0-9]{13}$/;

        if (!num.match(visaPattern) && !num.match(masterCardPattern) && !num.match(discoverCardPattern) && !num.match(amexPattern)){
            return 'Invalid card number';
        }
        if (num.length === 16){
            return num.substring(0,4) + '-' + num.substring(4,8) + '-' + num.substring(8,12) + '-' + num.substring(12,16);
        }else if (num.length === 12){
            return num.substring(0,4) + '-' + num.substring(4,8) + '-' + num.substring(8,12);
        }else{
            return 'Card must be 12 or 16 digits long';
        }
    }

    render() {

        let subTotal = this.state.productsInCart.length ? this.orderTotal() : '0.00';

        return (
            <section className='routeWrapper'>

                <MainHeader getProductsInCart={this.getProductsInCart} />

                <div className='clCartHeader'>
                    <h1>Checkout</h1>
                </div>

                <div className='info'>
                    <p>Shipping Info</p>
                    <input placeholder='Shipping Name' value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} />
                    <input placeholder='Street Address' value={this.state.streetAddress} onChange={(e)=>this.setState({streetAddress: e.target.value})} />
                    <input placeholder='City' value={this.state.city} onChange={(e)=>this.setState({city: e.target.value})} />
                    <input placeholder='State' value={this.state.state} onChange={(e)=>this.setState({state: e.target.value})} />
                    <input placeholder='Zip' value={this.state.zip} onChange={(e)=>this.setState({zip: e.target.value})} />
                </div>

                <div className='info'>
                    <p>Payment Info</p>
                    <input placeholder='Name on card' value={this.state.nameOnCard} onChange={(e)=>this.setState({nameOnCard: e.target.value})} />
                    <input placeholder='Card Number' value={this.state.cardNumber} onChange={(e)=>this.setState({cardNumber: e.target.value})} />
                    <input placeholder='Expiration Date - MM/YYYY' value={this.state.cardExpires} onChange={(e)=>this.setState({cardExpires: e.target.value})} />
                    <input placeholder='3 Digit Card Security Code' value={this.state.cardSecurityCode} onChange={(e)=>this.setState({cardSecurityCode: e.target.value})} />
                </div>

                <div className='checkoutSummary'>
                    <h2>COST SUMMARY</h2>
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

                    <h2>SHIPPING SUMMARY</h2>
                    <p>To: <span>{this.state.name}</span></p>
                    <p>Shipping Address: <span>{this.state.streetAddress}</span></p>
                    <p>City, State, Zip: <span>{this.state.city}, {this.state.state} {this.state.zip}</span></p>

                    <h2>PAYMENT SUMMARY</h2>
                    <p>Name On Card: <span>{this.state.nameOnCard}</span></p>
                    <p>Card Number: <span>{this.formatCardNum(this.state.cardNumber)}</span></p>
                    <p>Expiration Date: <span>{this.state.cardExpires}</span></p>
                    <p>Security Code: <span>{this.state.cardSecurityCode}</span></p>
                </div>

                <div className='submitPaymentDiv'>
                    <button className='submitPaymentBtn' onClick={()=>this.placeOrder()} >Place Order</button>
                </div>

                <MainFooter />

            </section>
        );
    }
}


export default Checkout;