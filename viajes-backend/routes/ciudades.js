var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ciudad = require('../model/ciudadModel.js');


router.get('/', function(req, res, next) {
    Ciudad.find(function (err, ciudades) {
        if (err) return next(err);
        res.json(ciudades);
    });
});

router.get('/:id', function(req, res, next) {
    Ciudad.findById(req.params.id).exec(function(err, ciudades) {
        if (err) return next(err);
        res.json(ciudades);
    });
});

module.exports = router;
