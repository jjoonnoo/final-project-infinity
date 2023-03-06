const express = require('express');
const router = express.Router();

const MainController = require('../controllers/search.controller');
const mainController = new MainController();
// const authMiddleware = require('../middleware/auth')
router.get('/', mainController.search);
router.get('/', mainController.getList);

module.exports = router;
