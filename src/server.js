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
const getBooks = require('./routes/getBooks.js');
const addBooks = require('./routes/addBooks.js');
const deleteBook = require('./routes/deleteBook.js');

// get all books for logged in user
app.get('/books', getBooks);
// add new book
app.post('/books', addBooks);
//delete book
app.delete('/books/:id', deleteBook);

// exporting express app and server start function
module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  },
};
