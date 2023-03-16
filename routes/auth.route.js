const express = require('express');
const router = express();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.js');

const auth_Controller = new AuthController();

router.post('/signup', auth_Controller.signup);

router.post('/signin', auth_Controller.signin);

// router.get("/logout", auth_Controller.logout);

// 로그인, 회원가입 페이지

// router.get('/login', (req, res) => {
//     res.render('login.ejs', { layout: false });
// });

// 토큰검증API
router.get('/signin/check', authMiddleware, async (req, res) => {
    res.json({ user: res.locals.user });
});

module.exports = router;
