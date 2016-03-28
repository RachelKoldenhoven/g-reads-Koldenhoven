/**
 * Created by rachelkoldenhoven on 3/28/16.
 */
var knex = require('../../../db/knex.js');


module.exports = {

  getBooks: function () {
    return knex.table('books');
  },

  getAuthors: function () {
    return knex.table('authors');
  }


};