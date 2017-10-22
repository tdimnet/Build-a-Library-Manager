'use strict';

var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books', {
    title: 'Books',
  });
});

module.exports = router;
