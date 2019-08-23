'use strict';

module.exports = {};

/**
 * console logs data from the request object for all requests to server
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
module.exports.requestInfo = ( request, response, next ) => {
  console.log('method: ', request.method);
  console.log('URL: ', request.originalURL);
  console.log('Parameters: ', request.params);
  console.log('queries: ', request.query);
  console.log('body: ', request.body, '\n');
  next();
};

/**
 * bridges the route with the model schema needed
 * adds a model property to the request object that can be used by CRUD functions after this
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
module.exports.modelLoader = ( request, response, next ) => {
  let modelName = request.params.model;
  const Model = require('./models/mongomodel');
  const schema = require(`../models/${modelName}/${modelName}-schema`);
  request.model = new Model ( schema );
  next();
};

/**
 * catches any invalid routes and returns 404
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
module.exports.error404 = ( request, response, next ) => {
  response.status(404);
  response.send('four, oh four.');
  next();
};

/**
 * handles errors
 *
 * @param {*} error
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
module.exports.errorHandler = ( error, request, response, next ) => {
  response.send( error );
  next();
};
