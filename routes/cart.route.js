const express = require('express');
const router = express();

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

router.get(
    '/general',
    /*  authMiddleware, */ productController.generalProductFindCart
);

router.post(
    '/general',
    /*  authMiddleware, */ productController.generalProductPurchase
);

router.patch(
    '/general',
    /*  authMiddleware, */ productController.generalProductChangeQuantity
);

router.delete(
    '/general',
    /*  authMiddleware, */ productController.generalProductDeleteCart
);

module.exports = router;
