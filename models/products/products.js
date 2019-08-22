'use strict';

const Model = require('../mongomodel');
const schema = require('./product-schema');

class Product extends Model {

  constructor(){
    super( schema );
  }
}

module.exports = Product;