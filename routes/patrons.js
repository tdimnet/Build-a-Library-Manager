var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

/* GET PATRONS home page. */
router.get('/', function(req, res, next) {
  Patron.findAndCountAll().then(function(results) {
    res.render('patrons', {
      title: 'Patron',
      patrons: results.rows
    });
  })
});

module.exports = router;
