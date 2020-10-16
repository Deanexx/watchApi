const express = require('express'),
    watchControllers = require('./../controllers/watchController');

const router = express.Router();

router
    .route('/')
    .get(watchControllers.getAllWatches)
    .post(watchControllers.createWatch);

router
    .route('/:id')
    .get(watchControllers.getWatch);

module.exports = router;