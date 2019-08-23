'use strict';

const mongoose = require('mongoose');

const categories = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  type : {
    type : String,
    required : true,
  },
  rating : {
    type : Number,
    required : true,
  },
});

module.exports = mongoose.model('categories-schema', categories);