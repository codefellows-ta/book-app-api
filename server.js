'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const getKey = require('./modules/getKey.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (req, res) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
  try{
  let token = req.headers.authorization.split(' ')[1];
  // console.log(token);
  console.log(req.query);

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

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
