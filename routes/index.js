const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const productRouter = require('./product.route');
const homeRouter = require('./home.route');
const searchRouter = require('./search.route');
const cartRouter = require('./cart.route');
// const orderRouter = require('./order.route')
router.use('/', homeRouter);
router.use('/api/users', userRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
// router.use('/orders',orderRouter)

module.exports = router;
