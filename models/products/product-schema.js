'use strict';

const mongoose = require('mongoose');

//because we are using mongoose.Schema to create this schema object, we can use mongoose methods by using schema.method().
let product = mongoose.Schema({
  name : {
    type: String,
    required : true,
  },
  price : {
    type : Number,
    required : true,
  },
  cool : {
    type : Boolean,
    required : true,
  },
});

module.exports = mongoose.model('product-schema', product);