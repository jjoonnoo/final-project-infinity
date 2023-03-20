const express = require('express');
const router = express();
const authMiddleware = require('../middlewares/auth');
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.get('/purchase', authMiddleware, orderController.getPurchaseHistory);
router.get('/sale', authMiddleware, orderController.getSaleHistory);

module.exports = router;
