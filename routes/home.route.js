const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller.js');
// const authMiddleware = require('../middlewares/auth-middleware');
// const adminCheck = require('../middlewares/admin');

router.get('/', homeController.homepage);
router.get('/myinfo', homeController.myinfo);
router.get('/productregist', homeController.productregist);
router.get('/cart', homeController.cart);
// router.get('/myorders', homeController.myOrders);
router.get('/general/detail/:id', homeController.generalDetail);
router.get('/auction/detail/:id', homeController.auctionDetail);
router.get('/auction/purchase/:id', homeController.auctionPurchase);

/* 임시 메인페이지 render */
router.get('/main', (req, res) => {
    res.render('search', {
        title: 'BNS',
    });
});

module.exports = router;
