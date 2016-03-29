var express = require('express');
var router = express.Router();
var pg = require('pg');
var queries = require('../lib/queries');
var helpers = require('../lib/helpers');


/// *** render index page *** ///
router.get('/', function(req, res, next) {
  res.render('index', { title: 'gReads' });
});


/// *** show all books page *** ///
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


/// *** render new book page *** ///
router.get('/books/new', function(req, res, next) {
  queries.getAuthors().then(function(authors) {
    res.render('newBook', {
      title: 'new book',
      authors: authors
    })
  })
});

/// *** show one book page *** ///
router.get('/books/:id', function(req, res, next) {
  var id = req.params.id;
  queries.getOneBook(id).then(function(book) {
    queries.getSomeAuthors(id).then(function(authors) {
      res.render('oneBook', {
        title: book.title,
        book: book[0],
        authors: authors
      })
    })
  })
});

router.post('/books/new', function(req, res, next) {
  var newBook = req.body;
  console.log(newBook);
  helpers.validateBook(newBook, function(errors) {
    if(errors.length) {
       res.render('newBook', {
         title: 'new book',
         book: newBook,
         errors: errors
       });
    }   else {
      queries.addNewBooK(newBook).then(function(id) {
        var id = parseInt(id);
        res.redirect('/books/' + id);
      })
    }
  })
});




module.exports = router;
