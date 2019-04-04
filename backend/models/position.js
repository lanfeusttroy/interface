var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var positionSchema = mongoose.Schema({
    ident: String, 
    id_bdd: String,
    nom: String, 
    pavillon: String, 
    type_otan: String,
    mmsi: String,
    callsign: String, 
    date: Date, 
    lat: Number, 
    lon: Number,
    rte: Number, 
    vit: Number,
    source: String, 
    capteur: String,
    type_information: String, 
    date_insertion: String,
       

});


var PositionModel = mongoose.model('positions', positionSchema);

module.exports = PositionModel;