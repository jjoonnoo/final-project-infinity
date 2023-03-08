const express = require('express');
const router = express();
const upload = require('../middlewares/multer');
// router.use(express.urlencoded({ extended: true }));

// const authMiddleware = require('../middlewares/미들웨어 파일')

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

// router.get(
//     '/general/detail/:general_product_id',
//     /*  authMiddleware, */ productController.findOneProduct
// );
// router.post(
//     '/general/detail/:general_product_id',
//     /*  authMiddleware, */ productController.productAddCart
// );
// router.post(
//     '/general_report/:general_product_id',
//     /*  authMiddleware, */ productController.reportProduct
// );

// router.get('/auction/:auction_product_id', /*  authMiddleware, */ auction

// )
router.post('/general', productController.generalProductRegist);
router.patch('/general', productController.generalProductModify);
router.delete('/general', productController.generalProductDelete);
router.post('/auction', productController.auctionProductRegist);
router.patch('/auction', productController.auctionProductModify);
router.delete('/auction', productController.auctionProductDelete);
router.get('/general', productController.findMyProduct);
router.post('/image_upload', upload.single('image'), (req, res) => {
    res.json({ url: req.file.location });
});
module.exports = router;
