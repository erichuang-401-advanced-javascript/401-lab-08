'use strict';

module.exports = {};

module.exports.requestInfo = ( request, response, next ) => {
  console.log('method: ', request.method);
  console.log('parameters: ', request.params);
  console.log('queries: ', request.query);
  console.log('body: ', request.body, '\n');
  next();
};

module.exports.error404 = ( request, response, next ) => {
  response.status(404);
  response.send('four, oh four');
  next();
};

module.exports.errorHandler = ( error, request, response, next ) => {
  response.send( error );
  next();
};
