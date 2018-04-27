import React, { Component } from 'react';
import axios from 'axios';

import './ProductsLandingProducts.css';


class ProductsLandingProducts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            loadingProducts: true,
        }
        
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/getProducts`)
            .then(res => {
                console.log(res);
                this.setState({
                    products: res.data,
                    loadingProducts: false,
                })
            })
    }

    addToCart(productID, productTitle) {
        axios.post('/api/addToCart', { "productID": productID })
            .then(res => {
                alert(productTitle + ' was added to your cart.');
            })
    }

    render() {
        let products;
        if (this.state.products.length) {
            products = this.state.products.map((product, i) => {

                // creates a pattern (case doesn't matter) that we can match to filter products by category
                let categoryFilterPattern = new RegExp(this.props.attributeToShow, 'i');
                
                // for each product, check if it's attributes contain the pattern we are matching
                if (product.attributes.match(categoryFilterPattern)) {
                    return (
                        <div draggable="true" className='plpSingleProductWrapper' key={i}>
                            <img src={product.image} alt="" />
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                            <h3>{product.price}</h3>
                            <h5 onClick={() => this.addToCart(product.id, product.title)}>Buy Now</h5>
                        </div>
                    )
                }

            })
        }else if (this.state.loadingProducts){
            products = <div className='plpSingleProductWrapper'><h1>Loading Products...</h1></div>
        } else {
            products =
                <div className='plpSingleProductWrapper'>
                    <h1>No 'products' in the database were found</h1>
                </div>
        }

        return (
            <section className="plpSection">
                <div className='plpContentWrapper'>
                    {products}
                </div>
            </section>
        );
    }
}


export default ProductsLandingProducts;