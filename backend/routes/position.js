var express = require('express');
var router = express.Router();

//models
var PositionModel = require('../models/position.js');
var NavireModel = require('../models/navire.js');


// GeoJSON Feature Collection
function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}


router.get('/', function(req, res, next) {
    
    const query = PositionModel.find()
                             .limit(50);
                             

    query.exec(function(err, positions){
        if (err){
            res.send(err); 
        }

        var featureCollection = new FeatureCollection();
        var i = 0;

        
        positions.forEach(element => {   
           

            let jsonElement = JSON.parse(JSON.stringify(element));

            let navire = NavireModel.findOne( { "imo": jsonElement.ident } );
            

            let feature = {};
            let properties = {};

            feature["type"] = "Feature";
            feature["geometry"] = jsonElement.location;

            properties ={ 
                    type: "marker",
                    id_bdd: jsonElement.id_bdd,
                    ident: jsonElement.ident,
                    nom: jsonElement.nom,
                    pavillon: jsonElement.pavillon,
                    mmsi: jsonElement.mmsi,
                    type_otan: jsonElement.type_otan,
                    rte: jsonElement.rte,
                    vit: jsonElement.vit,
                    lon: jsonElement.lon,
                    lat: jsonElement.lat,
                    date: jsonElement.date,                    
            };


            feature["properties"] = properties;
               

            featureCollection.features[i] = feature;
            i++;
        });

        res.json(featureCollection);  
    });
	
});

module.exports = router;