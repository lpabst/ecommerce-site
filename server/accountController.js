var app = require('./index.js');

var accountController = {

    isAdmin: (req, res) => {
        let isAdmin = (req.session && req.session.isAdmin) ? true : false;
        return res.status(200).send({isAdmin: isAdmin});
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

                return res.status(200).send({error: false, message: 'Success', response: response})
            } else {
                return res.status(200).send({error: true, message: 'Invalid username or password.'})
            }            
        })
        .catch(err => {
            res.status(200).send({error: true, message: 'We encountered an unexpectd error', err: err})
        })        
    },

    createAccount: (req, res) => {
        const db = req.app.get('db');

        let {firstName, lastName, email, password, confirmPassword} = req.body;
        console.log(firstName, lastName, email, password, confirmPassword)

        // Error handling
        if (!firstName || !lastName){
            return res.status(200).send({error: true, message: 'Please provide your first and last name'});
        }

        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return res.status(200).send({error: true, message: 'Invalid email address'});
        }
        
        if (!password || password.length < 8){
            return res.status(200).send({error: true, message: 'Your password must be at least 8 characters long'});
        }
        
        if (!password.match(/[A-Z]/)){
            return res.status(200).send({error: true, message: 'Your password must contain at least 1 UPPERCASE Letter'});
        }
        
        if (!password.match(/[a-z]/)){
            return res.status(200).send({error: true, message: 'Your password must contain at least 1 lowercase Letter'});
        }
        
        if (password !== confirmPassword){
            return res.status(200).send({error: true, message: 'Passwords do not match. Please confirm your password in the Confirm Password box'});
        }

        // make sure the username isn't already in the DB
        db.findUserByEmail([email])
        .then( response => {
            if(response.length){
                return res.status(200).send({error: true, message: 'That username has already been taken'})
            } else {      
                // If the username isn't being used, create the account
                db.createAccount([email, password, firstName, lastName])
                .then( success => {
        
                    // Need to send confirmation email to their email account here
                    
                    res.status(200).send({error: false, message: 'Success'});
                    return this.login(req, res);
                })
                .catch(err=>{
                    return res.status(200).send({error: true, message: 'We encountered an unexpectd error creating your account', err: err});
                })
            }            
        })
        .catch(err => {
            res.status(200).send({error: true, message: 'We encountered an unexpectd error while checking for duplicate account', err: err})
        })  
    },

}

module.exports = accountController