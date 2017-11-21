var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AutoSchema = Schema({
    marca : {type : String, default: ''},
    modelo : {type : String, default: ''},
    cantidadTotal : {type : Number, default: 0},
    cantidadDisponible : {type : Number, default: 0},
    monto : {type : Number, default: 0},
    agencia : { type: Schema.Types.ObjectId, ref: 'Agencia' },
    url: {type : String, default: ''}
});

var Auto = mongoose.model('Auto', AutoSchema );

module.exports = Auto;

