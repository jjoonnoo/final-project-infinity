const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const SearchController = require('../controllers/search.controller');
const searchController = new SearchController();

router.get('/product/:searchkeyword', searchController.search);

router.get('/products', searchController.getList);
router.get('/auctionProduct', searchController.getAuctionProduct);
router.get('/generalProduct', searchController.getGeneralProduct);

router.get('/recommendProducts', searchController.recommendProducts);

module.exports = router;
