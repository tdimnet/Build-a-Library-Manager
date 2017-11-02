'use strict';

var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


// ROUTE FOR NEW BOOK VIEW
router.get('/new', function(req, res, next) {
  var book = Book.build();
  res.render('book/new-book', {
    title: 'Create a new book',
    book: book,
  });
});


/* GET BOOKS home page. */
router.get('/', function(req, res, next) {
  Book.findAndCountAll().then(function(results) {
    res.render('book/books', {
      title: 'Books',
      books: results.rows
    });
  })
});

// ROUTE FOR GET BOOK BY ID
router.get('/details/:id', function(req, res, next) {
  res.render('book/book-details')
});

module.exports = router;
