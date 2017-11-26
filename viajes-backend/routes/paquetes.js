var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Paquete = require('../model/paqueteModel.js');
var ReservaHotel = require('../model/reservaHotelModel.js');
var ReservaVuelo = require('../model/reservaVueloModel.js');
var ReservaAuto = require('../model/reservaAutoModel.js');
var Vuelo = require('../model/vueloModel.js');
var Auto = require('../model/autoModel.js');
var Hotel = require('../model/hotelModel.js');



router.get('/', function(req, res, next) {
    Paquete.find(function (err, response) {
        if (err) return next(err);
        res.json(response);
    });
});

router.get('/:id', function(req, res, next) {
    Paquete.findById(req.params.id).populate({
        path: 'reservaVuelo',
        populate: { path: 'vuelo',
            populate:  [{ path: 'aerolinea'},{ path: 'ciudadOrigen'},{ path: 'ciudadDestino'}]
        }
      }).populate({
        path: 'reservaHotel',
        populate: { path: 'hotel',
            populate: { path: 'ciudad'}
        }
      }).populate({
        path: 'reservaAuto',
        populate: [{ path: 'auto', populate: {path: 'agencia'} },{ path: 'lugarRetiro' }, { path: 'lugarDevolucion' }]
      }).exec(function(err, paquete) {
        if (err) return next(err);
        res.json(paquete);
    });
});

router.post('/ReservaHotel', function(req, res, next) {
    var nuevaReserva = new ReservaHotel ({
        hotel: req.body.hotel,
        monto: req.body.monto
    });

    nuevaReserva.save(function(err) {
        if (err) throw err;
    });

    Paquete.findById(req.body.idPaquete).exec(function(err, paquete) {
        if (err) return next(err);
        paquete.reservaHotel.push(nuevaReserva);
        paquete.save(function(err) {
            if (err) throw err;
            res.json(paquete);
        });
    });

});

router.post('/ReservaVuelo', function(req, res, next) {
    var nuevaReserva = new ReservaVuelo ({
        vuelo: req.body.vuelo,
        monto: req.body.monto
    });

    nuevaReserva.save(function(err) {
        if (err) throw err;
    });

    Paquete.findById(req.body.idPaquete).exec(function(err, paquete) {
        if (err) return next(err);
        paquete.reservaVuelo.push(nuevaReserva);
        paquete.save(function(err) {
            if (err) throw err;
            res.json(paquete);
        });
    });
});

router.post('/ReservaAuto', function(req, res, next) {
    var nuevaReserva = new ReservaAuto ({
        auto: req.body.auto,
        monto: req.body.monto,
        lugarRetiro: req.body.lugarRetiro,
        lugarDevolucion: req.body.lugarDevolucion
    });

    nuevaReserva.save(function(err) {
        if (err) throw err;
    });

    Paquete.findById(req.body.idPaquete).exec(function(err, paquete) {
        if (err) return next(err);
        paquete.reservaAuto.push(nuevaReserva);
        paquete.save(function(err) {
            if (err) throw err;
            res.json(paquete);
        });
    });
});

// router.post('/', function(req, res, next) {
//     var contactsList = [] ;
//     for(var c of req.body.contacts) {
//         contactsList.push(c._id);
//     }
//     var newList = new List ({
//         name : req.body.name,
//         contacts : contactsList
//     });
//     newList.save(function(err) {
//         if (err) throw err;
//         res.json(newList);
//     });
// });

router.put('/pagar/:id', function(req, res, next) {
    Paquete.findById(req.params.id).populate('reservaVuelo reservaHotel reservaAuto').exec(function(err, paquete) {
        for (var i = 0; i < paquete.reservaAuto.length; i++) {
            Auto.findById(paquete.reservaAuto[i].auto).exec(function(err, auto) {
                //Hacer reserva
                //TODO
                auto.save(function(err) {
                    if (err) throw err;
                });
            });
        }

        for (var i = 0; i < paquete.reservaVuelo.length; i++) {
            Vuelo.findById(paquete.reservaVuelo[i].vuelo).exec(function(err, vuelo) {
                vuelo.cantPasajerosDisp --;
                vuelo.save(function(err) {
                    if (err) throw err;
                });
            });
        }

        for (var i = 0; i < paquete.reservaHotel.length; i++) {
            Hotel.findById(paquete.reservaHotel[i].hotel).exec(function(err, hotel) {
                hotel.cantidadHabitacionesDisponibles --;
                hotel.save(function(err) {
                    if (err) throw err;
                });
            });
        }

        if (err) return next(err);
        paquete.pagado = true;
        paquete.save(function(err) {
            if (err) throw err;
            res.json(paquete);
        });
    });
});

// router.delete('/:id', function(req, res, next) {
//     List.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

module.exports = router;
