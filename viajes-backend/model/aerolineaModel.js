var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AerolineaSchema = Schema({
    name : {type : String, default: ''}
});

var Aerolinea = mongoose.model('Aerolinea', AerolineaSchema );

module.exports = Aerolinea;
