/**
 * Created by rachelkoldenhoven on 3/28/16.
 */
var queries = require('../lib/queries');



function validateBook(newBook, callback) {
  var errors = [];
  console.log(newBook);
  queries.getBooks().then(function(books) {
    console.log(books);
    for(var i = 0; i < books.length; i++) {
      if (books[i].title.toLowerCase() === newBook.title.toLowerCase()) {
        errors.push('This book already exists.  Please choose a new book.');
      }
    }
    callback(errors);
  });
}






module.exports = {
  validateBook: validateBook
};