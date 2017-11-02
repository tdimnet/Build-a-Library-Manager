var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

// ROUTE FOR LOANS VIEW
router.get('/', function(req, res, next) {
  var booksOverdue = {
    include: [Book, Patron]
  }

  Loan
    .findAndCountAll(booksOverdue)
    .then(function(results) {
    res.render('loan/loans', {
      title: 'Loan',
      loans: results.rows
    });
  })
});


// ROUTE FOR NEW LOAN
  // GET
router.get('/new', function(req, res, next) {

  var loan = Loan.build({
    loaned_on: '2018-10-10',
    return_by: '2019-10-20'
  });

  Book
    .findAll()
    .then(function(books) {
      Patron
        .findAll()
        .then(function(patrons) {
          res.render('loan/new-loan', {
            title: 'Create a new loan',
            loan: loan,
            books: books,
            patrons: patrons
          });
        })
    })
});

  // POST


module.exports = router;
