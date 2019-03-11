var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');  

const bcrypt = require('bcrypt');

const tokenkey =  require('../config/key.js').tokenKey;

//models
var UserModel = require('../models/user.js');

router.get('/', function(req, res, next) {
    const query = UserModel.find()
                             .limit(10)
                             .sort({'nom': 'asc'});

    query.exec(function(err, users){
        if (err){
            res.send(err); 
        }
        res.json(users);  
    });
   
});

router.post('/register', function(req, res, next) {
   
    const  email  =  req.body.email;
    const  password  =  req.body.password;

    UserModel.findOne({"email":email}, function(err, user){
        if (err)
                res.send(err);
        else{
                        
            if(bcrypt.compareSync(password, user.password) == true){
                const  expiresIn  =  24  *  60  *  60;

                var token = jwt.sign({
                                        username: user.username                                
                                    }, 
                                    tokenkey,
                                    {
                                        expiresIn:  expiresIn
                                    });

                res.send({
                    token: token,
                    user: {username:user.username, email:user.email, expires_in: expiresIn}
                });
                
            }else{
                res.status(404).send('Invalide User !!!');
            }
            
        }
            res.json(user);
    });

})

router.post('/add', function(req, res, next) {
    

    let newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password, 10),
    };

   

    UserModel.create(newUser, function(err, user){
        if (err)
            res.send(err);
        res.json(user);
    });

})

module.exports = router;