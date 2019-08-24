'use strict';

//Dependencies & Modules
const express = require('express');
const app = express();
const middleware = require('./middleware');
const crud = require('./routes/crudAPI');

//For req.body
app.use(express.json());
app.use(express.urlencoded( { extended : true} ));

//Middleware
app.use(middleware.requestInfo);

//Routes
app.use(crud);

//Error handling
app.use('/*', middleware.error404);
app.use(middleware.errorHandler);
app.use('/docs', express.static('./docs'));

module.exports = {
  app,
  start : port => {
    const PORT = port || process.env.PORT || 3000;
    app.listen( PORT, () => console.log('BATTLECRUISER OPERATIONAL O7'));
  },
};