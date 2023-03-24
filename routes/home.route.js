const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller.js');
const authMiddleware = require('../middlewares/auth');
// const adminCheck = require('../middlewares/admin');

router.get('/', homeController.homepage);
router.get('/loginandsignup', homeController.loginandsignup);
router.get('/myinfo', homeController.myinfo);
router.get('/productregist', homeController.productregist);
router.get('/myproduct', homeController.myproduct);
router.get(
    '/generalproductmodify/:general_product_id',
    homeController.generalproductmodify
);
router.get(
    '/auctionproductmodify/:auction_product_id',
    homeController.auctionproductmodify
);
router.get('/purchasehistory', homeController.purchasehistory);
router.get('/salehistory', homeController.salehistory);
router.get('/search/product', homeController.search);

router.get('/cart', homeController.generalcart);
router.get('/general/:general_product_id', homeController.generalDetail);
router.get('/auction/:auction_product_id', homeController.auctionDetail);
router.get('/purchase/:id', homeController.auctionPurchase);

router.get('/chatbot', homeController.chatBot);
router.get('/videochat', homeController.videochat);

module.exports = router;
