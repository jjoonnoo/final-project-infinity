const express = require('express');
const router = express.Router();
// const homeController = require('../controllers/home.Controller.js');
// const authMiddleware = require('../middlewares/auth-middleware');
// const adminCheck = require('../middlewares/admin');

// router.get('/', homeController.homepage);
// router.get('/mypage', homeController.mypage);
// router.get('/cart', homeController.cart);
// router.get('/myorders', homeController.myOrders);

/* 일반상품 상세페이지 */
router.get('/product/general/:id', (req, res) => {
    res.render('generalProductDetail', {
        title: '상세보기',
    });
});

module.exports = router;
