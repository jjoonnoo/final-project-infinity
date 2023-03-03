const express = require('express');
const router = express();
// const authMiddleware = require('../middlewares/미들웨어 파일')

const GeneralProductDetailController = require('../controllers/generalProductDetail.controller');
const generalproductDetailController = new GeneralProductDetailController();

router.get(
    '/general/:general_product_id',
    /*  authMiddleware, */ generalproductDetailController.findOneProduct
);
router.post(
    '/general/:general_product_id',
    /*  authMiddleware, */ generalproductDetailController.productAddCart
);
router.post(
    '/report/general_report/:general_product_id',
    /*  authMiddleware, */ generalproductDetailController.reportProduct
);

module.exports = router;