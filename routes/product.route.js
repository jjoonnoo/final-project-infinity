const express = require('express');
const router = express();

router.use(express.urlencoded({ extended: true }));

// const authMiddleware = require('../middlewares/미들웨어 파일')

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

/* 일반상품 상세페이지 API */
router.get(
    '/general/detail/:general_product_id',
    /*  authMiddleware, */ productController.generalProductFind
);
router.post(
    '/general/detail/:general_product_id',
    /*  authMiddleware, */ productController.generalProductAddCart
);
router.post(
    '/general/report/:general_product_id',
    /*  authMiddleware, */ productController.generalProductreport
);

/* 일반상품 장바구니 페이지 API */
router.get(
    '/general/cart',
    /*  authMiddleware, */ productController.generalProductFindCart
);

router.post(
    '/general/cart',
    /*  authMiddleware, */ productController.generalProductPurchase
);

router.patch(
    '/general/cart/change_quantity',
    /*  authMiddleware, */ productController.generalProductChangeQuantity
);

router.delete(
    '/general/cart/delete_product',
    /*  authMiddleware, */ productController.generalProductDeleteCart
);

/* 경매상품 상세페이지 API */
router.get(
    '/auction/detail/:auction_product_id',
    /*  authMiddleware, */ productController.auctionProductFind
);

router.post(
    '/auction/report/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductReport
);

router.patch(
    '/auction/update/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductPriceUpdate
);

/* 경매상품 구매페이지 API */
router.get(
    '/auction/purchase/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductPurchase
);

router.post('/general', productController.generalProductRegist);
router.patch('/general', productController.generalProductModify);
// router.delete('/general',productController.generalProductDelete)
router.post('/auction', productController.auctionProductRegist);
router.patch('/auction', productController.auctionProductModify);
// router.delete('/auction',productController.auctionProductDelete)
router.get('/general', productController.findMyProduct);
module.exports = router;
