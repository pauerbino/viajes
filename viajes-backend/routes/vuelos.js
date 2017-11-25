var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vuelo = require('../model/vueloModel.js');
var Aerolinea = require('../model/aerolineaModel.js');

router.get('/:fecha/:origen/:destino', function(req, res, next) { 
    var partesFecha = req.params.fecha.split('-');
    fechaComienzo = new Date(partesFecha[2],partesFecha[1]-1,partesFecha[0]); 
    fechaFin = new Date(partesFecha[2],partesFecha[1]-1,partesFecha[0]); 
    fechaFin.setDate(fechaFin.getDate() + 1);
    Vuelo.find({fechaSalida: {$gt: fechaComienzo, $lt:fechaFin}, cantPasajerosDisp: {$gt: 0}}, {"ciudadOrigen": req.params.origen}, {"ciudadDestino": req.params.destino}).populate('aerolinea ciudadOrigen ciudadDestino').select('fechaSalida fechaLlegada cantPasajerosDisp cantPasajeros precio').exec(function (err, response) {
       if (err) return next(err);
       res.json(response);
	});
});

// router.get('/:id', function(req, res, next) {
//     List.findById(req.params.id).populate('contacts').exec(function(err, list) {
//         if (err) return next(err);
//         res.json(list);
//     });
// });

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