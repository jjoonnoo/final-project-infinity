const express = require('express');
const router = express();
const upload = require('../middlewares/multer');
// router.use(express.urlencoded({ extended: true }));

const authMiddleware = require('../middlewares/auth');

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

/* 일반상품 상세페이지 API */
router.get(
    '/general/:general_product_id',
    productController.generalProductFind
);

router.post(
    '/general/report/:general_product_id',
    authMiddleware,
    productController.generalProductReport
);
router.post(
    '/cart/:general_product_id',
    authMiddleware,
    productController.generalProductAddCart
);

router.post(
    '/general/review/:general_product_id',
    authMiddleware,
    productController.generalProductReview
);
/* 경매상품 상세페이지 API */
router.get(
    '/auction/:auction_product_id',
    productController.auctionProductFind
);

router.post(
    '/auction/report/:auction_product_id',
    authMiddleware,
    productController.auctionProductReport
);

router.post(
    '/auction/review/:auction_product_id',
    authMiddleware,
    productController.auctionProductReview
);

router.patch(
    '/bid_price/:auction_product_id',
    authMiddleware,
    productController.auctionProductPriceUpdate
);

/* 경매상품 즉시 구매페이지 API */
router.get(
    '/now_purchase/:auction_product_id',
    authMiddleware,
    productController.auctionProductPurchaseNowFind
);

router.post(
    '/purchase/:auction_product_id',
    authMiddleware,
    productController.auctionProductPurchaseNow
);
/* my page 관련 */
router.post('/general', authMiddleware, productController.generalProductRegist);
router.get(
    '/general/:general_product_id',
    authMiddleware,
    productController.getGeneralProduct
);
router.patch(
    '/general/:general_product_id',
    authMiddleware,
    productController.generalProductModify
);
router.delete(
    '/general/:general_product_id',
    authMiddleware,
    productController.generalProductDelete
);
router.post('/auction', authMiddleware, productController.auctionProductRegist);
router.get(
    '/auction/:auction_product_id',
    authMiddleware,
    productController.getAuctionProduct
);
router.patch(
    '/auction/:auction_product_id',
    authMiddleware,
    productController.auctionProductModify
);
router.delete(
    '/auction/:auction_product_id',
    authMiddleware,
    productController.auctionProductDelete
);
router.get('/my_product', authMiddleware, productController.findMyProduct);
router.post('/image_upload', upload.single('image'), (req, res) => {
    res.json({ url: req.file.location });
});

module.exports = router;
