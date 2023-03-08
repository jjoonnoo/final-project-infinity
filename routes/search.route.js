const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const MainController = require('../controllers/search.controller');
const mainController = new MainController();
// const authMiddleware = require('../middleware/auth')
router.get('/search/:searchword', mainController.search);
router.get('/', mainController.getList);
router.get('/auctionProduct', mainController.getAuctionProduct);
router.get('/generalProduct', mainController.getGeneralProduct);

module.exports = router;
