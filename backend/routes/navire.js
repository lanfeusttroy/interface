var express = require('express');
var router = express.Router();

//models
var NavireModel = require('../models/navire.js');

router.get('/', function(req, res, next) {	
	NavireModel.find(function(err, navires){
        if (err){
            res.send(err); 
        }
        res.json(navires);  
    }); 
});

router.get('/imo/:value', function(req, res, next) {	
    let imo = req.params.value;

    NavireModel.find({"imo":imo}, function(err, navire){
        if (err)
                res.send(err);
            res.json(navire);
    });
	
});

module.exports = router;
