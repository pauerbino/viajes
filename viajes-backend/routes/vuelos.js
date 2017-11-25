<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vuelo = require('../model/vueloModel.js');
var Aerolinea = require('../model/aerolineaModel.js');

router.get('/:fecha/:origen/:destino', function(req, res, next) { 
    console.log(req.params.fecha);
    var partesFecha = req.params.fecha.split('-');
    fechaComienzo = new Date(partesFecha[2],partesFecha[1]-1,partesFecha[0]); 
    fechaFin = new Date(partesFecha[2],partesFecha[1]-1,partesFecha[0]); 
    fechaFin.setDate(fechaFin.getDate() + 1);

    Vuelo.find({"ciudadOrigen": req.params.origen}, {"ciudadDestino": req.params.destino}, { cantPasajerosDisp: {$gt: 0}}).populate('aerolinea ciudadOrigen ciudadDestino').select('fechaSalida fechaLlegada cantPasajerosDisp cantPasajeros precio').exec(function (err, response) {
    //Vuelo.find({"ciudadOrigen": req.params.origen}, {"ciudadDestino": req.params.destino}, { cantPasajerosDisp: {$gt: 0}}, {"fechaSalida": {"$gte": new Date(2018,0,11), "$lt": new Date(2018,0,12)}}).populate('aerolinea ciudadOrigen ciudadDestino').select('fechaSalida fechaLlegada cantPasajerosDisp cantPasajeros precio').exec(function (err, response) {
	//{fechaSalida: {$gt: ISODate("2018-01-12"), $lt:ISODate("2018-01-13")}}
    //{ fechaSalida: {$gt: fechaComienzo, $lt: fechaFin}}
    //Vuelo.find().populate('aerolinea').populate('ciudadOrigen').populate('ciudadDestino').exec(function (err, response) {
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
=======
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vuelo = require('../model/vueloModel.js');



router.get('/:destino/:fecha', function(req, res, next) {
    Vuelo.find(function (err, response) {
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
>>>>>>> 0ddb13f4cf6ac2908a918ab6ccb9091dfa404073
