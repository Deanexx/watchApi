const express = require('express'),
    cartControllers = require('./../controllers/cartController');

const router = express.Router();

router
    .route('/:token')
    .get(cartControllers.createCart);

router.delete('/:token', cartControllers.removeCart)

router.patch('/:token', cartControllers.beforeUpdateCart, cartControllers.updateCart);

module.exports = router;