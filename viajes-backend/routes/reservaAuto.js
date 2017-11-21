var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ReservaAuto = require('../model/reservaAutoModel.js');
var Auto = require('../model/autoModel.js');


router.get('/', function(req, res, next) {
    ReservaAuto.find(function (err, rta) {
        if (err) return next(err);
        res.json(rta);
    });
});

router.get('/:id', function(req, res, next) {
    ReservaAuto.findById(req.params.id).populate('autos').exec(function(err, rta) {
        if (err) return next(err);
        res.json(rta);
    });
});

router.post('/', function(req, res, next) {
    var nuevaReserva = new ReservaAuto ({
        auto : req.body.auto,
        lugarRetiro : req.body.lugarRetiro,
        lugarDevolucion : req.body.lugarDevolucion,
        monto : req.body.monto
    });

    nuevaReserva.save(function(err) {
        if (err) throw err;
        res.json(nuevaReserva);
    });
});

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

router.delete('/:id', function(req, res, next) {
    ReservaAuto.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
