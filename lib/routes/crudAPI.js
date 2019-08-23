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
 *
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function getData ( request, response ) {
  if( request.query.id ){
    return request.model.get( request.query.id )
      .then( result => response.status(200).send( result ) )
      .catch( error => next( error ));
  } else request.model.get()
    .then( result => response.status(200).send( result ) )
    .catch( error => next( error ));
}
/**
 *
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function createNew ( request, response ) {
  if ( request.body ){
    return request.model.create( request.body )
      .then( result => response.status(201).send( result ) )
      .catch( error => next( error ));
  } else response.send( 'Cannot create: Invalid input.' );
}

/**
 *
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function update ( request, response ) {
  if ( request.query.id ){
    return request.model.update( request.query.id, request.body )
      .then( updatedItem => response.status(201).send( updatedItem ))
      .catch( error => next( error ));
  } else response.send( 'Cannot update: bad ID' );
}

/**
 *
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function remove ( request, response ) {
  if ( request.query.id ){
    return request.model.delete( request.query.id )
      .then( deletedItem => response.status(201).send( deletedItem ))
      .catch( error => next( error ));
  } else response.send( 'Cannot delete: bad ID' );
}

/**
 *pass ID in through query, update or delete through url params
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function putHandler ( request, response ) {
  if ( request.method === 'PUT' && request.params && request.query.id ){
    if ( request.params.request === 'update' ) { return update( request, response ); }
    if ( request.params.request === 'delete' ) { return remove( request, response ); }
  } else response.send( 'Need more info!' );
}

module.exports = router;