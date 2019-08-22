'use strict';

//require
require('dotenv').config();

//need server start
const server = require('./lib/server');

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

