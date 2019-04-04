var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var navireSchema = mongoose.Schema({
    imo: String, 
    id_bdd: String,
    nom: String,     
    pavillon: String, 
    type_otan: String,
    sequence: String, 
    indicatif: String, 
    mmsi: String,
    sconum: String, 
    etat: String, 
    caracteristiques: {
        construction: String, 
        tonnage: String, 
        tonnage_net: String, 
        nbr_pont: String,
        franc_bord: String, 
        largeur: String, 
        tirant_eau: String,
        long_hors_tout: String, 
        nbr_helice: String, 
        type_helice: String, 
        vitesse: String, 
    },
    equipements:{
        sondeur: Number, 
        radar: Number, 
        radio_telephone: Number, 
        radio_mf: Number,
        radio_vhf: Number, 
        radio_hf: Number, 
        inmarsat: String
    },
    caracteristiques: {
        compagnie: String, 
        port_attache: String, 
        equipage: String,         
    }
}); 

var NavireModel = mongoose.model('navires', navireSchema);

module.exports = NavireModel;