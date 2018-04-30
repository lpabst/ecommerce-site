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
            } else {
                return res.status(200).send({error: true, message: 'Invalid username or password.'})
            }
            
            
            return res.status(200).json( response )
        })
        .catch(err => {
            
            res.status(500).send(err)
        })        
    },

    createAccount: (req, res) => {
        const db = req.app.get('db');
        console.log(req.body);
        return res.status(200).send('ok');
    },

}

module.exports = accountController