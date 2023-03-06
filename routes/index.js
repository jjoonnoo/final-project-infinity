const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
const homeRouter = require('./home.routes');

router.use('/', homeRouter);
// router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
