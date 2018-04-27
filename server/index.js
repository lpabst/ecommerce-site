const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 60 * 24 * 14) //this is 14 days
  }
}))

massive(config.connection)
.then(db => {
  app.set('db', db);
}).catch(err=>{});

app.use(express.static(__dirname + './../build'));

//////////Endpoints for the front end
const mainController = require('./mainController.js');

app.get('/api/getProducts', mainController.getProducts);
app.get('/api/getProductsInCart', mainController.getProductsInCart);
app.post('/api/login', mainController.login);
app.post('/api/addToCart', mainController.addToCart);
app.post('/api/addProduct', mainController.addProduct);
app.delete('/api/deleteProduct', mainController.deleteProduct);
app.patch('/api/updateProduct', mainController.updateProduct);




app.listen(config.port, console.log("you are now connected on " + config.port));
