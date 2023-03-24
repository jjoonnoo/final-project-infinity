const express = require('express');
const router = express();
const authMiddleware = require('../middlewares/auth');
const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/getmyinfo', authMiddleware, userController.getMyInfo);
router.patch('/user/:user_id', authMiddleware, userController.modifyUser);
router.post('/confirm_pwd', authMiddleware, userController.confirmUserPwd);
router.delete('/user/:user_id', authMiddleware, userController.deleteUser);
module.exports = router;
