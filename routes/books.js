'use strict';

var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


// ROUTE FOR NEW BOOK VIEW

// Render Function for book
function renderNewBook(res, book, err) {
  res.render('book/new-book', {
      title: 'Create a new book',
      book: book,
      errors: err ? err.errors : [],
    }
  );
}

// Create book view
router.get('/new', function(req, res, next) {
  var book = Book.build();
  renderNewBook(res, book);
});

// Create book POST
router.post('/new', function(req, res, next) {
  Book
    .create(req.body)
    .then(function(book) {
      res.redirect('/books');
    })
    .catch(function(err) {
      if (err.name === 'SequelizeValidationError')
      {
        let book = Book.build(req.body);
        renderNewBook(res, book, err);
      }
      else res.send(500);
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

function renderUpdateBookDetails(res, book, err) {

  let loanQuery = {
    include: [Book, Patron],
    where: {
      book_id: book.id // all loans for book id
    }
  }

  Loan.findAll(loanQuery)
      .then((loans) => {
        res.render('book/book-details', {
            book: book,
            loans: loans,
            errors: err ? err.errors : [],
          }
        );
      });
}


  // Get book by id
router.get('/details/:id', function(req, res, next) {
  Book
    .findById(req.params.id)
    .then(function(book) {
      renderUpdateBookDetails(res, book);
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
      if (err.name === 'SequelizeValidationError') {
        let book = Book.build(req.body);
        renderUpdateBookDetails(res, book, err);
      }
      else res.send(500);
    })
});


// ROUTE FOR OVERDUE LIST
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
      var books = results.rows.map(function(loan) {
        return loan.Book;
      });

      res.render('book/books', {
        title: 'Overdue Books',
        books: books
      });
    })
});


// ROUTE FOR CHECKED OUT LIST
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
      var books = results.rows.map(function(loan) {
        return loan.Book;
      });

      res.render('book/books', {
        title: 'Checked Out Books',
        books: books
      })
    })

});

module.exports = router;
