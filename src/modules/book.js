'use strict';

// dependencies
const jwt = require('jsonwebtoken');

// custon modules
const Book = require('../models/bookModel.js');
const getKey = require('../modules/getKey.js');

// mongo book object
const book = {};

// GET
book.getBooks = (req, res, next) => {
  try{ 

    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);

    jwt.verify(token, getKey, (err, decoded) => {
      if(err) {
        res.status(500).json('invalid token');
      } else {
        // console.log(decoded );
        let email = decoded.email;
        Book.find( { email }, (err, results) => {
          if(err) {
            res.status(500).send('Resource not found in database');
          } else {
            res.status(200).json(results)
          };
        });
      };
    });

  } catch(err) {
    let errObj = {
      raw: err,
      message: err.message,
      status: err.status,
    };
    res.status(500).json(errObj);
  };
};

// POST
book.addBook = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, getKey, {}, (err, decoded) => {
      if(err) {
        res.status(500).send('invalid token');
      } else {
        let email = decoded.email;
        let { title, description, status } = req.body;
        if( title && description && status && email ) {
          let book = new Book({ title, description, status, email });
          book.save()
            .then(() => {
              Book.find( { email }, (err, results) => {
                if(err) {
                  res.status(500).send('Resource not found in database');
                } else {
                  res.status(200).json(results)
                };
              });
            })
        }
      }
    });

  } catch(err) {
    console.error(err.message);
    let errObj = {
      raw: err,
      message: err.message,
      status: error.status,
    };
    res.status(500).json(errObj);
  };
};

// PUT

book.updateBook = async(req, res, next) => {
  try{

    let token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, getKey, {}, (err, decoded) => {
      if(err) {
        res.status(500).send('invalid token');
      } else {
        let email = decoded.email;
        let { id } = req.params;
        let { title, description, status } = req.body;
        let updatedBook = { title, description, status, email }
        if(id) {
          Book.findByIdAndUpdate(id, updatedBook)
            .then(() => {
              Book.find({ email }, (err, results) => {
                if(err) {
                  res.status('Resource not found in database');
                } else {
                  res.status(200).json(results);
                }
              })
            })
        }
      }
    })

  } catch(err) {
    console.error(err.message);
    let errObj = {
      raw: err,
      message: err.message,
      status: error.status,
    };
    res.status(500).json(errObj);
  };
}

// DELETE
book.deleteBook = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, getKey, {}, (err, decoded) => {
      if(err) {
        res.status(500).send('invalid token')
      } else {
        console.log(req.params);
        let { id } = req.params;
        let email = decoded.email;
        if(id) {
          Book.findByIdAndDelete(id)
            .then(() => {
              Book.find({ email }, (err, results) => {
                if(err) {
                  res.status(500).send('Resource not found in database');
                } else {
                  res.status(200).json(results)
                };
              });
            })
        }
      }
    })
  } catch(err) {
    console.error(err.message);
    let errObj = {
      raw: err,
      message: err.message,
      status: error.status,
    };
    res.status(500).json(errObj);
  };
};

module.exports = book;