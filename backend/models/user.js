var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    nom: String, 
    prenom: String, 
    username: String, 
    email: {type:String,unique:true},
    password: String, 
},{timestamps:true});

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
