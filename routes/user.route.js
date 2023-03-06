const express = require('express');
const router = express();
// const authMiddleware = require('../middlewares/미들웨어 파일')
const UserController = require('../controllers/user.controller');
const userController = new UserController();
module.exports = router;
