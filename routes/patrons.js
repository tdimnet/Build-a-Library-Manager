var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


// ROUTE FOR CREATING NEW PATRON

  // Create new patron get method
  router.get('/new', function(req, res, next) {
    var patron = Patron.build();
    res.render('patron/new-patron', {
      title: 'Create new patron',
      patron: patron
    });
  });

  // Create new patron post method
  router.post('/new', function(req, res, next) {
    Patron
      .create(req.body)
      .then(function(patron) {
        res.redirect('/patrons');
      })
      .catch(function(err) {
        console.log(err);
      })
  });


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
  Patron
    .findById(req.params.id)
    .then(function(patron) {
      res.render('patron/patron-details', {
        patron: patron
      });
  })
});

module.exports = router;
