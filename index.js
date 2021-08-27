'use strict';

require('dotenv').config();

const server = require('./src/server.js');
const mongoose = require('mongoose');

// function to seed database if empty
const seed = require('./src/modules/mongoSeed.js');

const uri = process.env.atlas_uri;
// const uri = process.env.local_uri
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose
  .connect(uri, options)
  .catch(err => {
    console.log(err.reason);
    mongoose.disconnect();
  })
  .then(console.log('mongoDB connected'))
  .then(seed());

server.start(process.env.PORT || 3001);