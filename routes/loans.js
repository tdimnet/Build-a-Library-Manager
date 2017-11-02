var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

// GET LOANS home page.
router.get('/', function(req, res, next) {

  var booksOverdue = {
    include: [Book, Patron]
  }

  Loan
    .findAndCountAll(booksOverdue)
    .then(function(results) {
      console.log(results);
    res.render('loan/loans', {
      title: 'Loan',
      loans: results.rows
    });
  })
});


// NEW LOAN VIEW
router.get('/new', function(req, res, next) {
  res.render('loan/new-loan');
});

module.exports = router;
