'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom modules
const getKey = require('./modules/getKey.js');

// route handlers
const getBooks = require('./routes/getBooks.js');

// test route to ensure auth0 is connected and working properly
app.get('/test', (req, res) => {
  try{
  let token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) {
      res.status(500).send('invalid token');
    } else {
      res.status(200).send(decoded.name)
    }
  });
  } catch(err) {
    console.log(err.message);
  }
});

// get all books for logged in user
app.get('/books', getBooks);

// exporting express app and server start function
module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  },
};
