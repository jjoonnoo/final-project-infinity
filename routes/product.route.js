const express = require('express');
const router = express();

router.use(express.urlencoded({ extended: true }));

// const authMiddleware = require('../middlewares/미들웨어 파일')

const GeneralProductDetailController = require('../controllers/generalProductDetail.controller');
const generalproductDetailController = new GeneralProductDetailController();

router.get(
    '/general/detail/:general_product_id',
    /*  authMiddleware, */ generalproductDetailController.findOneProduct
);
router.post(
    '/general/detail/:general_product_id',
    /*  authMiddleware, */ generalproductDetailController.productAddCart
);
router.post(
    '/general_report/:general_product_id',
    /*  authMiddleware, */ generalproductDetailController.reportProduct
);

// router.get('/auction/:auction_product_id', /*  authMiddleware, */ auction

// )

module.exports = router;
