const express = require('express');
const router = express();

router.use(express.urlencoded({ extended: true }));

// const authMiddleware = require('../middlewares/미들웨어 파일')

const GeneralProductDetailController = require('../controllers/generalProductDetail.controller');
const generalProductDetailController = new GeneralProductDetailController();

const AuctionProductDetailController = require('../controllers/auctionProductDetail.controller')
const auctionProductDetailController = new AuctionProductDetailController

/* 일반상품 상세페이지 API */
router.get(
    '/general/detail/:general_product_id',
    /*  authMiddleware, */ generalProductDetailController.findOneProduct
);
router.post(
    '/general/detail/:general_product_id',
    /*  authMiddleware, */ generalProductDetailController.productAddCart
);
router.post(
    '/general_report/:general_product_id',
    /*  authMiddleware, */ generalProductDetailController.reportProduct
);

/* 경매상품 상세페이지 API */
router.get(
    '/auction/detail/:auction_product_id',
    /*  authMiddleware, */ auctionProductDetailController.findOneProduct
);

// router.post(
//     '/auction/detail/:auction_product_id',
//     /*  authMiddleware, */ auctionProductDetailController.purchaseProduct
// )

router.post(
    '/auction_report/:auction_product_id',
    /*  authMiddleware, */ auctionProductDetailController.reportProduct
);

// /* 장바구니 페이지 API */
// router.get(
//     '/cart',
//     /*  authMiddleware, */ cartController.findAllCart
// );


module.exports = router;
