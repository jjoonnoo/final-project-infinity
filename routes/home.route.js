const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller.js');
// const authMiddleware = require('../middlewares/auth-middleware');
// const adminCheck = require('../middlewares/admin');

router.get('/', homeController.homepage);
// router.get('/mypage', homeController.mypage);
// router.get('/cart', homeController.cart);

module.exports = router;
