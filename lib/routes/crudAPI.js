'use strict';

const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

router.param('model', middleware.modelLoader);

/**
 * This route handles GET requests
 * @route GET /:model
 * @param {string} model name required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */
router.get('/:model', getData);

/**
 * This route handles POST requests 
 * @route POST /:model
 * @param {string} model name required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */
router.post('/:model', createNew);

/**
 * This route handles PUT requests
 * @route PUT /:model/:request
 * @param {string} model name required
 * @param {string} request name required
 * @returns {object} 201
 * @returns {Error} default - Unexpected error
 */
router.put('/:model/:request', putHandler);

/**
 * Queries database by request's ID query
 * @param {*} request
 * @param {*} response
 * @returns record by ID or all records if no ID
 */
function getData ( request, response, next ) {
  if( request.query.id ){
    return request.model.get( request.query.id )
      .then( result => response.status(200).send( result ) )
      .catch( error => next( error ));
  } else request.model.get()
    .then( result => response.status(200).send( result ) )
    .catch( error => next( error ));
}
/**
 * Creates a new record to the db
 * @param {*} request
 * @param {*} response
 * @returns the query
 */
function createNew ( request, response, next ) {
  if ( request.body ){
    return request.model.create( request.body )
      .then( result => response.status(200).send( result ) )
      .catch( error => next( error ));
  } else response.send( 'Cannot create: Invalid input.' );
}

/**
 * Takes request query ID and updates with an updated property passed in the request body
 * @param {*} request
 * @param {*} response
 * @returns the updated record
 */
function update ( request, response, next ) {
  if ( request.query.id ){
    return request.model.update( request.query.id, request.body )
      .then( updatedItem => response.status(200).send( updatedItem ))
      .catch( error => next( error ));
  } else response.send( 'Cannot update: bad ID' );
}

/**
 * Removes a record by request query ID
 * @param {*} request
 * @param {*} response
 * @returns the deleted item
 */
function remove ( request, response, next ) {
  if ( request.query.id ){
    return request.model.delete( request.query.id )
      .then( deletedItem => response.status(200).send( deletedItem ))
      .catch( error => next( error ));
  } else response.send( 'Cannot delete: bad ID' );
}

/**
 * checks request method = put and if parameters exist and if request query id exists
 * if param request = update or delete, passes control to those functions
 * @param {*} request
 * @param {*} response
 * @returns the return from either update or remove functions
 */
function putHandler ( request, response ) {
  if ( request.method === 'PUT' && request.params && request.query.id ){
    if ( request.params.request === 'update' ) { return update( request, response ); }
    if ( request.params.request === 'delete' ) { return remove( request, response ); }
  } else response.send( 'Need more info!' );
}

module.exports = router;