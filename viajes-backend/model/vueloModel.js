var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VueloSchema = Schema({
    nombre : {type : String, default: ''},
    aerolinea : { type: Schema.Types.ObjectId, ref: 'Aerolinea' },
    ciudadOrigen: {type : String, default: ''},
    ciudadDestino: {type : String, default: ''},
    fechaSalida: {type: Date},
    fechaLlegada: {type: Date},
    cantPasajeros: {type: Number, default: 0},
    cantPasajerosDisp: {type: Number, default: 0},
    precio: {type: Number, default: 0}
});

var Vuelo = mongoose.model('Vuelo', VueloSchema );

module.exports = Vuelo;
