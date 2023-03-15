const express = require('express');
const router = express();
// const authMiddleware = require('../middlewares/미들웨어 파일')
const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/getmyinfo', userController.getMyInfo);
router.patch('/user/:user_id', userController.modifyUser);
router.post('/confirm_pwd', userController.confirmUserPwd);
router.delete('/user/:user_id', userController.deleteUser);
module.exports = router;
