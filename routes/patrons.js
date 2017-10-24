var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

// GET ALL PATRONS home page.
router.get('/', function(req, res, next) {
  Patron.findAndCountAll().then(function(results) {
    res.render('patron/patrons', {
      title: 'Patron',
      patrons: results.rows
    });
  })
});


// GET PATRON BY ID
router.get('/details/:id', function(req, res, next) {
  Patron.findById(req.params.id).then(function(results) {
    console.log(results);
    res.render('patron/patron-details', {
      
    });
  })
});

module.exports = router;
