var express = require('express');
var router = express.Router();

//models
var NavireModel = require('../models/navire.js');


router.get('/', function(req, res, next) {
    
    const query = NavireModel.find()
                             .limit(50)
                             .sort({'nom': 'asc'});

    query.exec(function(err, navires){
        if (err){
            res.send(err); 
        }
        res.json(navires);  
    });
	
});


router.get('/:limit/:row/:order', function(req, res, next) {
    let limit = 10;
    let row = 'nom';
    let order = 'ASC';
   
    
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

router.get('/bdd/:value', function(req, res, next) {	
    let id_bdd = req.params.value;

    
   
    NavireModel.findOne({"id_bdd":id_bdd}, function(err, navire){
        if (err)
                res.send(err);
            res.json(navire);
    });
	
});

router.get('/imo/:value', function(req, res, next) {	
    let imo = req.params.value;

    imo = '5337862';

    NavireModel.findOne({"imo":imo}, function(err, navire){
        if (err)
                res.send(err);
            res.json(navire);
    });
	
});

router.post('/filter', function(req, res, next) {
    let limit = 20;

    let params = req.body.params;
    let order = params.order;
    let page = params.page;
    let filters = JSON.parse(params.filters);
    
    let skip = page * limit;

    let search = {};
    

    Object.keys(filters).forEach(function(key){
        switch(filters[key].type){
            case "Contient":
                search[key] = new RegExp( (filters[key].value).toString(), 'i');
            break;
            case "Commence":
                search[key] = new RegExp('^' + (filters[key].value).toString(), 'i');
            break;
            case "Egal":
                search[key] = (filters[key].value).toString();
            break;
        }      
       
     });

        
    const sort = {};
    sort[order.row] = order.tri; 
   
        
    const query = NavireModel.find(search)
                             .limit(limit)
                             .skip(skip)
                             .sort(sort);

    query.exec(function(err, navires){
        if (err){
            res.send(err); 
        }
        res.json(navires);  
    });
    
	
});

module.exports = router;
