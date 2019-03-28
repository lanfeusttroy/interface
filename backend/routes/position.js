var express = require('express');
var router = express.Router();

//models
var PositionModel = require('../models/position.js');


// GeoJSON Feature Collection
function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}


router.get('/', function(req, res, next) {
    
    const query = PositionModel.find()
                             .limit(200);
                             

    query.exec(function(err, positions){
        if (err){
            res.send(err); 
        }

        var featureCollection = new FeatureCollection();
        var i = 0;

        
        positions.forEach(element => {   
            let jsonElement = JSON.parse(JSON.stringify(element));

            

            let feature = {};
            let properties = {};

            feature["type"] = "Feature";
            feature["geometry"] = jsonElement.location;

            properties ={ 
                    type: "marker",
                    ident: jsonElement.ident,
                    pavillon: jsonElement.pavillon,
                    mmsi: jsonElement.mmsi,
                    type_otan: jsonElement.type_otan,
                    rte: jsonElement.rte,
                    vit: jsonElement.vit,
                    date: jsonElement.date
            };


            feature["properties"] = properties;
               

            featureCollection.features[i] = feature;
            i++;
        });

        res.json(featureCollection);  
    });
	
});

module.exports = router;