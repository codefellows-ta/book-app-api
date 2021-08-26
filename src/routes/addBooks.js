'use strict';

// dependencies
const jwt = require('jsonwebtoken');

// custon modules
const Book = require('../models/bookModel.js');
const getKey = require('../modules/getKey.js');

module.exports = async (req, res, next) => {
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