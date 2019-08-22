'use strict';

const express = require('express');
const router = express.Router();
const routeHandler = require('./categoryHandlers');

router.get('/', routeHandler.getData);
router.post('/', routeHandler.createNew);
router.put('/:request', routeHandler.putHandler);

module.exports = router;