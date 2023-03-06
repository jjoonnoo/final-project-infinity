const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller')

const auth_Controller = new AuthController();

router.post("/signup", auth_Controller.signup);

router.post("/signin", auth_Controller.signin);

// router.get("/logout", auth_Controller.logout);

//토큰검증API
router.get("/signin/check", authMiddleware, async (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = router;