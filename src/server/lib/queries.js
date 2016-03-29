/**
 * Created by rachelkoldenhoven on 3/28/16.
 */
var knex = require('../../../db/knex.js');


module.exports = {

  getBooks: function () {
    return knex.table('books');
  },

  getOneBook: function (id) {
    return knex.table('books').where('id', id);
  },

  getAuthors: function () {
    return knex.table('authors');
  },

  getOneAuthor: function(id) {
    return knex.table('authors').where('id', id);
  },

  getSomeAuthors: function (id) {
    return knex.table('authors').where('book_id', id);
  },

  addNewBooK: function (newBook) {
    return knex.insert({
      title: newBook.title,
      book_genre: newBook.book_genre,
      description: newBook.description,
      book_cover_url: newBook.book_cover_url
    }).table('books').returning('id');
  },

  addNewAuthor: function (newAuthor) {
    return knex.insert({
      first_name: newAuthor.first_name,
      last_name: newAuthor.last_name,
      bio: newAuthor.bio,
      picture_url: newAuthor.picture_url
    }).table('authors').returning('id');
  },

  deleteBook: function (id) {
    return knex.table('books').where('id', id).del();
  },

  deleteAuthor: function(id) {
    return knex.table('authors').where('id', id).del();
  },

  updateBook: function(updatedBook, id) {
    return knex.update({
      title: updatedBook.title,
      book_genre: updatedBook.book_genre,
      description: updatedBook.description,
      book_cover_url: updatedBook.book_cover_url
    }).table('books').where('id', id);
  },

  updateAuthor: function(updatedBook, id) {
    return knex.update({
      first_name:  updatedBook.first_name,
      last_name: updatedBook.last_name
    }).table('authors')
      .where('book_id', id);
  }


};