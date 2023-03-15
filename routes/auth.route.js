const express = require('express');
const validate = require('../middlewares/validator')
const { body } = require('express-validator')

require('dotenv').config();

const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.js');

const auth_Controller = new AuthController();

// validate 

const validate_signin = [
  body('email')
    .normalizeEmail()
    .isEmail()
    .notEmpty()
    .withMessage('invalid email'),
  body('password')
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage('password must be at least 3 characters'),  
  validate  
];

const validate_signup = [
  ...validate_signin,
  body('phone')
    .isNumeric()
    .withMessage('only numbers!'),
  validate
]

router.post('/signup', validate_signup, auth_Controller.signup);

router.post('/signin', validate_signin, auth_Controller.signin);

// router.get("/logout", auth_Controller.logout);

// 로그인, 회원가입 페이지 

router.get('/login', (req, res) => {
  res.render('login.ejs', { layout: false });
});

// 토큰검증API
router.get('/signin/check', authMiddleware, async (req, res) => {
    res.json({ user: res.locals.user });
});


module.exports = router;
