'use strict';

//Dependencies & Modules
const express = require('express');
const app = express();
const middleware = require('./middleware');
const productRoutes = require('../routes/productHandlers/productRoutes');
const categoryRoutes = require('../routes/categoryHandlers/categoryRoutes');

//For req.body
app.use(express.json());

//Middleware
app.use(middleware.requestInfo);

//Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

//Error handling
app.use('/*', middleware.error404);
app.use(middleware.errorHandler);

module.exports = {
  app,
  start : port => {
    const PORT = port || process.env.PORT || 3000;
    app.listen( PORT, () => console.log('BATTLECRUISER OPERATIONAL O7'));
  },
};