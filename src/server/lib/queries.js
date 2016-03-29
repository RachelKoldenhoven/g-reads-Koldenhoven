/**
 * Created by rachelkoldenhoven on 3/28/16.
 */
var knex = require('../../../db/knex.js');


module.exports = {

  getBooks: function () {
    return knex.table('books');
  },

  getOneBook: function(id) {
    return knex.table('books').where('id', id);
  },

  getAuthors: function () {
    return knex.table('authors');
  },

  getSomeAuthors: function(id) {
    return knex.table('authors').where('book_id', id);
  },

  addNewBooK: function(newBook) {
    return knex.insert({
      title: newBook.title,
      book_genre: newBook.book_genre,
      description: newBook.description,
      book_cover_url: newBook.book_cover_url
    }).table('books').returning('id');
  },

  addNewAuthor: function(newAuthor) {
    return knex.insert( {

    })
  }
};