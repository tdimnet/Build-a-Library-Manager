var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


// ROUTE FOR CREATING NEW PATRON

function renderNewPatron(res, patron, err) {
  res.render('patron/new-patron', {
      patron: patron,
      errors: err ? err.errors : [],
      title: 'Create new patron',
    }
  )
}


function renderUpdatePatronDetails(res, patron, err) {
  let loanQuery = {
    include: [Book, Patron],
    where: {
      patron_id: patron.id // all loans for patron id
    }
  };

  Loan
    .findAll(loanQuery)
    .then(function(loans) {
        res.render('patron/patron-details', {
            patron: patron,
            loans: loans,
            errors: err ? err.errors : [],
          }
        );
      }
    );
}



// Create new patron get method
router.get('/new', function(req, res, next) {
  var patron = Patron.build();
  renderNewPatron(res, patron);
});

// Create new patron post method
router.post('/new', function(req, res, next) {
  Patron
    .create(req.body)
    .then(function(patron) {
      res.redirect('/patrons');
    })
    .catch(function(err) {
      if (err.name === 'SequelizeValidationError') {
        let patron = Patron.build(req.body);
        renderNewPatron(res, patron, err);
      }
      else res.send(500);
    })
});


// GET ALL PATRONS home page.
router.get('/', function(req, res, next) {
  Patron.findAndCountAll().then(function(results) {
    res.render('patron/patrons', {
      title: 'Patron',
      patrons: results.rows
    });
  })
});


// GET PATRON BY ID
router.get('/details/:id', function(req, res, next) {
  Patron
    .findById(req.params.id)
    .then(function(patron) {
      renderUpdatePatronDetails(res, patron);
    })
});

router.post('/details/:id', function(req, res, next) {
  Patron
    .findById(req.params.id)
    .then(function(patron) {
      return patron.update(req.body)
    })
    .then(function(patron) {
      res.redirect('/patrons')
    })
    .catch(function(err) {
      console.log(err);
    })
});

module.exports = router;
