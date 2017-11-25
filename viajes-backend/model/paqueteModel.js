var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaqueteSchema = Schema({
    usuario : { type: Schema.Types.ObjectId, ref: 'User' },
    reservaAuto : [{ type: Schema.Types.ObjectId, ref: 'ReservaAuto' }],
    reservaHotel : [{ type: Schema.Types.ObjectId, ref: 'ReservaHotel' }],
    reservaVuelo : [{ type: Schema.Types.ObjectId, ref: 'ReservaVuelo' }]
});

var Paquete = mongoose.model('Paquete', PaqueteSchema );

module.exports = Paquete;
