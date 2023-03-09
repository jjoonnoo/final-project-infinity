const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js');
// const authMiddleware = require('../middlewares/auth-middleware');
// const adminCheck = require('../middlewares/admin');

router.get('/', homeController.homepage);
// router.get('/mypage', homeController.mypage);
// router.get('/cart', homeController.cart);
// router.get('/myorders', homeController.myOrders);

/* 일반상품 상세페이지 render */
router.get('/product/general/:id', (req, res) => {
    res.render('generalProductDetail', {
        title: '일반 상세보기',
    });
});

/* 일반상품 장바구니 페이지 render */
router.get('/product/general_cart', (req, res) => {
    res.render('generalProductCart', {
        title: '장바구니',
    });
});

/* 경매상품 상세페이지 render */
router.get('/product/auction/:id', (req, res) => {
    res.render('auctionProductDetail', {
        title: '경매 상세보기',
    });
});

/* 경매상품 구매페이지 render */
router.get('/product/auction_purchase/:id', (req, res) => {
    res.render('auctionProductPurchase', {
        title: '경매상품',
    });
});

module.exports = router;
