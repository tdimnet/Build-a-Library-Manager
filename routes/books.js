'use strict';

var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


// ROUTE FOR NEW BOOK VIEW

  // Create book view
router.get('/new', function(req, res, next) {
  var book = Book.build();
  res.render('book/new-book', {
    title: 'Create a new book',
    book: book,
  });
});

  // Create book POST
router.post('/new', function(req, res, next) {
  Book
    .create(req.body)
    .then(function(book) {
      res.redirect('/books');
    })
    .catch(function(err) {
      // For now errors are logged in
      console.log(err);
    })
});


// ROUTE FOR BOOKS VIEW
  // Get all books
router.get('/', function(req, res, next) {
  Book.findAndCountAll().then(function(results) {
    res.render('book/books', {
      title: 'Books',
      books: results.rows
    });
  })
});

// ROUTE FOR ONE BOOK
  // Get book by id
router.get('/details/:id', function(req, res, next) {
  Book
    .findById(req.params.id)
    .then(function(book) {
      res.render('book/book-details', {
        book: book
      })
    })
});

  // Modify a specific book
router.post('/details/:id', function(req, res, next) {
  Book
    .findById(req.params.id)
    .then(function(book) {
      return book.update(req.body)
    })
    .then(function(book) {
      res.redirect('/books');
    })
    .catch(function(err) {
      // For now errors are logged in here too
      console.log(err);
    })
});


// ROUTE FOR OVERDUE LIST
router.get('/overdue', function(req, res, next) {

  var getBookByLoan = {
    include: [Book, Patron],
    return_by: { $lt: new Date() },
    returned_on: null
  }

  Loan
    .findAndCountAll(getBookByLoan)
    .then(function(results) {
      var books = results.rows.map(function(loan) {
        return loan.Book;
      });

      res.render('book/books', {
        title: 'Overdue Books',
        books: books
      });
    })
});

module.exports = router;
