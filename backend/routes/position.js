var express = require('express');
var router = express.Router();

//models
var PositionModel = require('../models/position.js');

router.get('/', function(req, res, next) {
    
    const query = PositionModel.find()
                             .limit(2);
                             

    query.exec(function(err, positions){
        if (err){
            res.send(err); 
        }
        res.json(positions);  
    });
	
});

module.exports = router;