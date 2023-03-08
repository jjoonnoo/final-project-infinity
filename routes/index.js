const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const productRouter = require('./product.route');
const homeRouter = require('./home.route');

router.use('/', homeRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
