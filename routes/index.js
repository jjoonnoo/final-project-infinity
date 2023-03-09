const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const productRouter = require('./product.route');
const homeRouter = require('./home.route');
const searchRouter = require('./search.route');

router.use('/', homeRouter, searchRouter);
// router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
