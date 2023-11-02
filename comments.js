// Create web server
var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
var mongoose = require('mongoose');

// Create a comment
router.post('/', function(req, res, next) {
  var comment = new comments(req.body);
  comment.save(function(err, comment) {
    if (err) { return next(err); }
    res.status(201).json(comment);
  });
});

// Get all comments
router.get('/', function(req, res, next) {
  comments.find(function(err, comments) {
    if (err) { return next(err); }
    res.json(comments);
  });
});

// Get a comment by id
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  comments.findById(id, function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Update a comment
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  comments.findByIdAndUpdate(id, req.body, function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Delete a comment
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  comments.findByIdAndRemove(id, req.body, function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

module.exports = router;