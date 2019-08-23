//generic API router

// const express = require('express');
// const modelLoader = require('path to modelloader')
// const router = express.Router();

// router.param('model', modelLoader); //express router method takes in parameter for folder path 
// and runs it through modelLoader

// router.METHOD('/:model', handleMethod);

//handleMethod functions

//function get

//function create

//function update

//function delete




//modelLoader.js

// module.exports = (request, response, next ) => {
//   const modelName = request.params.model; /products or /categories
//   const Model = require(`./models/${modelName}/model.js`);
//   request.model = new Model();
//   next();
// }