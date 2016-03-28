var express = require('express');
var router = express.Router();
var pg = require('pg');
var queries = require('../lib/queries');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'gReads' });
});


router.get('/books', function(req, res, next) {
  queries.getBooks().then(function(books) {
    queries.getAuthors().then(function(authors) {
      res.render('books', {
        title: 'books',
        books: books,
        authors: authors
      })
    })
  })
});

router.get('/books/new', function(req, res, next) {
  queries.getAuthors().then(function(authors) {
    res.render('newBook', {
      title: 'new book',
      authors: authors
    })
  })
});

module.exports = router;
