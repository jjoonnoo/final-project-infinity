const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  // 쿠키검증 
  if (!cookie) {
    return res.status(401).json({ message: "로그인 후 이용가능합니다." });
  }

  

}