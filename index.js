'use strict';

require('dotenv').config();

const server = require('./src/server.js');
const mongoose = require('mongoose');

// function to seed database if empty
const seed = require('./src/modules/mongoSeed.js');

const uri = process.env.mongo_uri;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri, options)
  .then(console.log('mongoDB connected'))
  .then(seed())
  .catch(err => {
    console.log(err.reason);
    mongoose.disconnect();
  });

server.start(process.env.PORT || 3001);