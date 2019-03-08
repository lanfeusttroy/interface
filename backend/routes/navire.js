var express = require('express');
var router = express.Router();

//models
var NavireModel = require('../models/navire.js');


router.get('/', function(req, res, next) {
    
    const query = NavireModel.find()
                             .limit(10)
                             .sort({'nom': 'asc'});

    query.exec(function(err, navires){
        if (err){
            res.send(err); 
        }
        res.json(navires);  
    });
	
});


router.get('/:limit/:champ/:order', function(req, res, next) {
    let limit = 10;
    let champ = 'nom';
    let order = 'asc';
   
    
    if(req.params.limit != undefined){
        limit = parseInt(req.params.limit);
    }   
    
    if(req.params.champ != undefined){
        champ = req.params.champ;
    } 

    if(req.params.order != undefined){
        order = req.params.order;
    } 

    const sort = {};
    sort[champ] = order;   

    
    const query = NavireModel.find()
                             .limit(limit)
                             .sort(sort);

    query.exec(function(err, navires){
        if (err){
            res.send(err); 
        }
        res.json(navires);  
    });
	
});

router.get('/first', function(req, res, next) {	  

    const query = NavireModel.findOne()                             
                             .sort({'nom': 'asc'});

    query.exec(function(err, navires){
        if (err){
            res.send(err); 
        }
        res.json(navires);  
    });

	
});

router.get('/test', function(req, res, next) {    
    
    const query = NavireModel.find().limit(2);
    
    query.exec(function(err, navires){
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
