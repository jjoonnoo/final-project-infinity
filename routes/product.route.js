const express = require('express');
const router = express();
const upload = require('../middlewares/multer');
// router.use(express.urlencoded({ extended: true }));

// const authMiddleware = require('../middlewares/미들웨어 파일')

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

/* 일반상품 상세페이지 API */
router.get(
    '/general/:general_product_id',
    /*  authMiddleware, */ productController.generalProductFind
);
router.post(
    '/cart/:general_product_id',
    /*  authMiddleware, */ productController.generalProductAddCart
);
router.post(
    '/general/report/:general_product_id',
    /*  authMiddleware, */ productController.generalProductReport
);

/* 경매상품 상세페이지 API */
router.get(
    '/auction/:auction_product_id',
    /*  authMiddleware, */ productController.auctionProductFind
);

router.post(
    '/auction/report/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductReport
);

router.patch(
    '/bid_price/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductPriceUpdate
);

/* 경매상품 즉시 구매페이지 API */
router.get(
    '/now_purchase/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductPurchaseNowFind
);

router.post(
    '/purchase/:auction_product_id',
    /* authMiddleware, */ productController.auctionProductPurchaseNow
);

router.post('/general', productController.generalProductRegist);
router.get('/general/:general_product_id', productController.getGeneralProduct);
router.patch(
    '/general/:general_product_id',
    productController.generalProductModify
);
router.delete(
    '/general/:general_product_id',
    productController.generalProductDelete
);
router.post('/auction', productController.auctionProductRegist);
router.get('/auction/:auction_product_id', productController.getAuctionProduct);
router.patch(
    '/auction/:auction_product_id',
    productController.auctionProductModify
);
router.delete(
    '/auction/:auction_product_id',
    productController.auctionProductDelete
);
router.get('/my_product', productController.findMyProduct);
router.post('/image_upload', upload.single('image'), (req, res) => {
    res.json({ url: req.file.location });
});

module.exports = router;
