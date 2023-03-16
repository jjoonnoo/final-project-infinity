const express = require('express');
const router = express();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.get('/purchase', orderController.getPurchaseHistory);
router.get('/sale', orderController.getSaleHistory);

module.exports = router;
