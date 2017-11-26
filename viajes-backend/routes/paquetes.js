var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Paquete = require('../model/paqueteModel.js');
var ReservaHotel = require('../model/reservaHotelModel.js');
var ReservaVuelo = require('../model/reservaVueloModel.js');
var ReservaAuto = require('../model/reservaAutoModel.js');



router.get('/', function(req, res, next) {
    Paquete.find(function (err, response) {
        if (err) return next(err);
        res.json(response);
    });
});

router.get('/:id', function(req, res, next) {
    Paquete.findById(req.params.id).populate('reservaVuelo').populate('reservaHotel').populate('reservaAuto').exec(function(err, paquete) {
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

// router.put('/:id', function(req, res, next) {
//     var contactsList = [] ;
//     for(var c of req.body.contacts) {
//         contactsList.push(c._id);
//     }
//     var body = {
//         name: req.body.name,
//         contacts: contactsList
//     }
//     List.findByIdAndUpdate(req.params.id, body, function (err, put) {
//         if (err) return next(err);
//         res.json(put);
//     });
// });

// router.delete('/:id', function(req, res, next) {
//     List.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

module.exports = router;
