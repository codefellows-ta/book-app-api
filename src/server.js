'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route handlers
const book = require('./modules/book.js');

// get all books for logged in user
app.get('/books', book.getBooks);
// add new book
app.post('/books', book.addBook);
// update a book
app.put('/books/:id', book.updateBook)
//delete book
app.delete('/books/:id', book.deleteBook);

// exporting express app and server start function
module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  },
};
