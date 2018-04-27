var app = require('./index.js');

mainController = {

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
            db.getProductsInCart()
            .then( productsInCart => {
                return res.status(200).send( productsInCart )
            })
            .catch(err => {
                
                res.status(500).send(err)
            })
        } else {
            return res.status(200).send([])
        }
    },
    login: function(req, res){
        
        const db = req.app.get('db');
        db.login([req.body.username, req.body.userpassword])
        .then( response => {
            if(response.length){
                req.session.isLoggedIn = true;
                req.session.user = response[0].id;

                if(response[0].isadmin === true){
                    req.session.isAdmin = true
                } else {
                    req.session.isAdmin = false
                }
            } else {
                return res.status(200).send('Invalid username or password.')
            }
            
            
            return res.status(200).json( response )
        })
        .catch(err => {
            
            res.status(500).send(err)
        })        
    },
    loadCart: function(){
        
    },
    addToCart: function(req, res){
        const db = req.app.get('db');        
        db.getCart([req.session.user])
        .then( response => {
            for(let i=0; i<response.length; i++){
                if(response[i].productid === req.body.productID){
                    let quantity = response[i].quantity;
                    quantity++;
                    db.addOneToQuantityInCart([req.body.productID, quantity, req.session.user])
                    .then(response => {
                       return res.status(200).send(response)
                    })
                    return
                }
            }
            db.addProductToCart([req.body.productID, req.session.user])
            .then( response => {
                return res.status(200).send(response)
            }).catch(err=>{});
            
        }).catch(err=>{});
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
        db.deleteProductFromCart([req.query.productID])
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