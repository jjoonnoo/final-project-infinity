const express = require('express');
const router = express();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

router.delete(
    '/general/:general_product_id',
    adminController.delGeneralProduct
);
router.delete(
    '/auction/:auction_product_id',
    adminController.delAuctionProduct
);
router.get('/report', adminController.getReports);

module.exports = router;
