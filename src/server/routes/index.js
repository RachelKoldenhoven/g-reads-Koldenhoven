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


/// *** show all authors page *** ///
router.get('/authors', function(req, res, next) {
  queries.getAuthors().then(function(authors) {
    res.render('authors', {
      title: 'authors',
      authors: authors
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

/// *** validate and add a new book *** ///
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

/// *** get the delete book page *** ///
router.get('/books/:id/delete', function(req, res, next) {
  var id = req.params.id;
  queries.getOneBook(id).then(function(book) {
    queries.getSomeAuthors(id).then(function(authors) {
      res.render('delete', {
        title: 'delete',
        book: book[0],
        authors: authors
      })
    })
  })
});


/// *** handle post to delete book from db *** ///
router.post('/books/:id/delete', function(req, res, next) {
  var id = req.params.id;
  queries.deleteBook(id).then(function() {
    res.redirect('/books');
  });
});


/// *** get edit book view *** ///
router.get('/books/:id/edit', function(req, res, next) {
  var id = req.params.id;
  queries.getOneBook(id).then(function(book) {
    queries.getSomeAuthors(id).then(function (authors) {
      res.render('editBook', {
        title: 'edit',
        book: book[0],
        authors: authors
      })
    })
  })
});

/// *** handle post request to edit a book *** ///
router.post('/books/:id/edit', function(req, res, next) {
  var id = req.params.id;
  var updatedBook = req.body;
  var author = updatedBook.author.split(" ");
  updatedBook.last_name = author[author.length-1];
  updatedBook.first_name = "";
  for(var i = 0; i < author.length-1; i++) {
    updatedBook.first_name += author[i];
    console.log(updatedBook.first_name);
  }
  console.log(updatedBook);
   queries.updateBook(updatedBook, id).then(function() {
    queries.updateAuthor(updatedBook, id).then(function() {
      res.redirect('/books/' + id);
    })
  })
});


module.exports = router;
