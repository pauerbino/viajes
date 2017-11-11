var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = require('../model/listModel.js');


router.get('/', function(req, res, next) {
    List.find(function (err, lists) {
        if (err) return next(err);
        res.json(lists);
    });
});

router.get('/:id', function(req, res, next) {
    List.findById(req.params.id).populate('contacts').exec(function(err, list) {
        if (err) return next(err);
        res.json(list);
    });
});

router.post('/', function(req, res, next) {
    var contactsList = [] ;
    for(var c of req.body.contacts) {
        contactsList.push(c._id);
    }
    var newList = new List ({
        name : req.body.name,
        contacts : contactsList
    });
    newList.save(function(err) {
        if (err) throw err;
        res.json(newList);
    });
});

router.put('/:id', function(req, res, next) {
    var contactsList = [] ;
    for(var c of req.body.contacts) {
        contactsList.push(c._id);
    }
    var body = {
        name: req.body.name,
        contacts: contactsList
    }
    List.findByIdAndUpdate(req.params.id, body, function (err, put) {
        if (err) return next(err);
        res.json(put);
    });
});

router.delete('/:id', function(req, res, next) {
    List.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
