const bcrypt = require("bcrypt");

const { User } = require('../models/index'); // sequelize의 모델
const AuthRepository = require('../repositories/auth.repository');

const jwt = require('jsonwebtoken');

require("dotenv").config();

// Service layer 
// const AuthService = require('../services/auth.service.js')

// // Passport config
// let passport_config = {
//   usernameField: 'email',
//   passwordField: 'password',
//   session: false,
// }

// jwt 관련 옵션
// const jwtOptions = {

// }

class AuthController {
  // auth_service = new AuthService(User); // AuthService의 인스턴스 생성성
  auth_repository = new AuthRepository(User);
  // 회원가입
  signup = async (req, res, next) => {
    try {
      const { email, name, password, phone, address, admin, raiting } = req.body;
      // Value 없을시 에러처리
      // if(!email || !name || !password || !phone || !address || !admin || !raiting ) {
      //   return res.status(400).json({message: '모든 값을 입력하세요'})
      // }

      // const found_by_email = await this.auth_repository.findByEmail(email);

      // 아이디 중복검사
      // if(found_by_email.length > 0) {
      //   return res.status(409).json({message: '이미 사용중인 아이디입니다.'})
      // }

      // bcrypt를 이용한 비밀번호 암호화(Saltrounds = 12) 
      const hashed = await bcrypt.hash(password, 12)
      const create_user = await this.auth_repository.createUser(
        email,
        name,
        hashed,
        phone,
        address,
        admin,
        raiting,
      )
      return res.status(201).json({ data: create_user, message: '회원가입에 성공하였습니다'})
    }

    catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }

  // 로그인

  // passport_verify = async (email, password, done) => {
  //   try {
  //     const user = await this.AuthService.findByEmail(email);
  //   if(!user) {
  //     done(null, false, { message: '존재하지 않는 사용자입니다.'});
  //     return;
  //   }
  // }
  // catch {
  // }
  signin = async (req, res, next) => {
    try {
      const {email, password} = req.body;

      const user = await this.auth_repository.findByEmail(email);

      const passwordTest = await bcrypt.compare(password, user.dataValues.password);
    
      if (user.length === 0 || !passwordTest) {
        return res
          .status(401)
          .json({ message: "사용자가 없거나 비밀번호가 틀렸습니다!" });
      }

      // access token 생성
      const access_token = jwt.sign(
        {
          user_id: user.dataValues.user_id,
          email: user.dataValues.email,
          admin: user.dataValues.admin
        },
        process.env.ACCESSTOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.cookie("accessToken", access_token);
      return res.status(200).json({msg: "로그인 완료!"})
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "로그인 실패"})
    }
  }

  //로그아웃
  signout = async (req, res) => {
    res.clearCookie("accessToken");
    return res.json({ msg: "로그아웃 성공"})
  }
}


module.exports = AuthController;