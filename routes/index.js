const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const productRouter = require('./product.route');
const homeRouter = require('./home.route');
const searchRouter = require('./search.route');
const cartRouter = require('./cart.route');

router.use('/', homeRouter, searchRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/api/carts', cartRouter);

module.exports = router;
