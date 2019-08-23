'use strict';

//require
require('dotenv').config();

//need server start
const server = require('./lib/server');
// eslint-disable-next-line no-unused-vars
const swagger = require('./docs/swagger');

//connect mongoose to mongo
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

//start server
server.start();

