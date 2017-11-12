var express = require('express');
var router = express.Router();
var moment  = require('moment');

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
    loaned_on: moment().format('YYYY-MM-DD'),
    return_by: moment().add(7, 'days').format('YYYY-MM-DD')
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
  router.post('/new', function(req, res, next) {
    Loan
      .create(req.body)
      .then(function(loan) {
        res.redirect('/loans')
      })
      .catch(function(err) {
        console.log(err);
      })
  });


  // ROUTE FOR GETTING LOANS OVERDUE
  router.get('/overdue', function(req, res, next) {

    var overdueBooks = {
      include: [Book, Patron],
      where: {
        return_by: { $lt: new Date() },
        returned_on: null
      }
    }

    Loan
      .findAndCountAll(overdueBooks)
      .then(function(results) {
        res.render('loan/loans', {
          title: 'Loan Overdue',
          loans: results.rows
        })
      })
  });

  // ROUTE FOR GETTINT CHECKED OUT LOANS
  router.get('/checked', function(req, res, next) {
    var checkedOutBooks = {
      include: [Book, Patron],
      where: {
        returned_on: null
      }
    }

    Loan
      .findAndCountAll(checkedOutBooks)
      .then(function(results) {
        res.render('loan/loans', {
          title: 'Checkout Out Books',
          loans: results.rows
        })
      })
  });


  // ROUTE FOR RETURNING BOOK
    // GET METHOD FOR VIEWING LOAN
  router.get('/return/:id', function(req, res, next) {
    var returnBook = {
      include: [Book, Patron],
      where: {
        id: req.params.id
      }
    };

    Loan
      .findOne(returnBook)
      .then(function(loan) {
        loan.returned_on = req.body && req.body.returned_on
                         ? req.body.returned_on
                         : moment().format('YYYY-MM-DD');
        res.render('loan/return-loan', {
          title: 'Return a Loan',
          loan: loan
        })
      })
  });

    // POST METHOD FOR UPDATING LOAN
  router.post('/return/:id', function(req, res, next) {
    Loan
      .findById(req.params.id)
      .then(function(loan) {
        loan.returned_on = req.body && req.body.returned_on
                         ? req.body.returned_on
                         : moment().format('YYYY-MM-DD');
        return loan.update(req.body)
      })
      .then(function() {
        res.redirect('/loans')
      })
      .catch(function(err) {
        console.log(err);
      })
  });


module.exports = router;
