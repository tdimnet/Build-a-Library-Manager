var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

/* GET LOANS home page. */
router.get('/', function(req, res, next) {
  Loan.findAndCountAll().then(function(results) {
    console.log(results);
    res.render('loan/loans', {
      title: 'Loan',
      loans: results.rows
    });
  })
});

module.exports = router;
