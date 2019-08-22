'use strict';

const Categories = require('../../models/categories/categories');
const categories = new Categories;

module.exports = {};

//helper functions

module.exports.getData = ( request, response ) => {
  if( request.query.id ){
    return categories.get( request.query.id )
      .then( result => response.status(200).send( result ) )
      .catch( error => response.status(500).send( error ) );
  } else categories.get()
    .then( result => response.status(200).send( result ) )
    .catch( error => response.status(500).send( error ) );
};

module.exports.createNew = ( request, response ) => {
  if ( request.body ){
    return categories.create( request.body )
      .then( result => response.status(201).send( result ) )
      .catch( error => response.status(500).send( error ) );
  } else response.send( 'Cannot create: Invalid input.' );
};

//pass ID in through query
module.exports.update = ( request, response ) => {
  if ( request.query.id ){
    return categories.update( request.query.id, request.body )
      .then( updatedItem => response.status(201).send( updatedItem ))
      .catch( error => response.status(500).send( error ) );
  } else response.send( 'Cannot update: bad ID' );
};

module.exports.delete = ( request, response ) => {
  if ( request.query.id ){
    return categories.delete( request.query.id )
      .then( deletedItem => response.status(201).send( deletedItem ))
      .catch( error => response.status(500).send( error ) );
  } else response.send( 'Cannot delete: bad ID' );
};

//pass ID in through query, update or delete through url params
module.exports.putHandler = ( request, response ) => {
  if ( request.method === 'PUT' && request.params && request.query.id ){
    if ( request.params.request === 'update' ) { return module.exports.update( request, response ); }
    if ( request.params.request === 'delete' ) { return module.exports.delete( request, response ); }
  } else response.send( 'Need more info!' );
};
