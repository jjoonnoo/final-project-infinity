const express = require('express');
const router = express();
const authMiddleware = require('../middlewares/auth');
const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

router.get('/find', authMiddleware, productController.generalProductFindCart);

router.post(
    '/purchase',
    authMiddleware,
    productController.generalProductPurchase
);

router.patch(
    '/quantity',
    authMiddleware,
    productController.generalProductChangeQuantity
);

router.delete(
    '/delete',
    authMiddleware,
    productController.generalProductDeleteCart
);

module.exports = router;
