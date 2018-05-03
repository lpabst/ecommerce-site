var app = require('./index.js');

var mainController = {

    getProducts: function(req, res){
        const db = req.app.get('db');
        db.getProducts()
        .then( products => {
            return res.status(200).send( products )
        })
        .catch(err => {
            
            res.status(500).send(err)
        })
    },

    getProductsInCart: function(req, res){
        const db = req.app.get('db');
        if(req.session.isLoggedIn){
            db.getProductsInCart([req.session.user])
            .then( productsInCart => {
                return res.status(200).send( productsInCart )
            })
            .catch(err => {
                res.status(500).send({error: true, message: err})
            })
        } else {
            return res.status(200).send([])
        }
    },

    loadCart: function(){
        // add load cart functionality here
    },

    addToCart: function(req, res){
        const db = req.app.get('db');   

        if (!req.session.user){
            return res.status(200).send({error: true, message: 'Must be logged in to add items to your cart'});
        }     

        db.getCart([req.session.user])
        .then( response => {
            for(let i=0; i<response.length; i++){
                if(response[i].productid === req.body.productID){
                    let quantity = response[i].quantity;
                    quantity++;
                    db.addOneToQuantityInCart([req.body.productID, quantity, req.session.user])
                    .then(response => {
                        return res.status(200).send({res: response, message: 'successfully increased number in cart'})
                    })
                    return
                }
            }
            db.addProductToCart([req.body.productID, req.session.user])
            .then( response => {
                return res.status(200).send({res: response, message: 'successfully added 1st one to cart'})
            }).catch(err=>{});
            
        }).catch(err=>{});
    },

    adjustQuantity: (req, res) => {
        const db = req.app.get('db');   

        if (!req.session.user){
            return res.status(200).send({error: true, message: 'Must be logged in to edit your cart'});
        }     

        let {quantity, productid, userid} = req.body;

        if (quantity > 0){
            // update quantity in cart
            db.adjustQuantity([quantity, productid, userid])
            .then( updated => {
                return res.status(200).send({error: false, message: 'Success'});
            })
            .catch( err => {
                return res.status(200).send({error: true, message: 'Unexpected error', err: err});
            })
        }else{
            // delete product from user's cart altogether
            db.deleteProductFromUsersCart([productid, userid])
            .then( deleted => {
                return res.status(200).send({error: false, message: 'Success'});
            })
            .catch( err => {
                return res.status(200).send({error: true, message: 'Unexpected error', err: err});
            })
        }
    },

    addProduct: function(req, res){
        const db = req.app.get('db');
        
        if(req.session.isAdmin === false || !req.session.isAdmin){
            return res.status(200).send( 'This function requires being logged in as an admin.' )
        }
        db.addProduct([req.body.title, req.body.description, req.body.price, req.body.image, req.body.attributes])
        .then( product => {
            
            return res.status(200).send( req.body.title + " was added to the product's database." )
        })
        .catch(err => {
            
            res.status(500).send(err)
        })
    },

    deleteProduct: function(req, res){
        
        const db = req.app.get('db');
        if(req.session.isAdmin === false || !req.session.isAdmin){
            return res.status(200).send( 'This function requires being logged in as an admin.' )
        }
        db.deleteProductFromEveryonesCart([req.query.productID])
        .then( product => {
        }).catch(err=>{});

        db.deleteProductFromProducts([req.query.productID])
        .then( product => {
            return res.status(200).send( req.query.productTitle + " was deleted from the product's database." )
        })
        .catch(err => {
            
            res.status(500).send(err)
        })        
    },

    updateProduct: function(req, res){
        const db = req.app.get('db');
        if(req.session.isAdmin === false || !req.session.isAdmin){
            return res.status(200).send( 'This function requires being logged in as an admin.' )
        }
        db.updateProduct([req.body.title, req.body.description, req.body.price, req.body.image, req.body.attributes, req.body.productID])
        .then( product => {
            return res.status(200).send( req.body.title + " was updated in the product's database." )
        })
        .catch(err => {
            
            res.status(500).send(err)
        })         
    }
}

module.exports = mainController