'use strict';

var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

/* GET BOOKS home page. */
router.get('/', function(req, res, next) {
  Book.findAndCountAll().then(function(results) {
    res.render( 'book/books', {
      title: 'Books',
      books: results.rows
    });
  })
});


// NEW BOOK VIEW
router.get('/new', function(req, res, next) {
  res.render('book/new-book');
});

module.exports = router;
