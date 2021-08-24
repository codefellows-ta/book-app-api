'use strict';

// dependencies
const jwt = require('jsonwebtoken');

// custon modules
const Book = require('../models/bookModel.js');
const getKey = require('../modules/getKey.js');

module.exports = (req, res, next) => {
  try{ 

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, (err, decoded) => {
      if(err) {
        res.status(500).json('invalid token');
      } else {
        let email = req.query.email;
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