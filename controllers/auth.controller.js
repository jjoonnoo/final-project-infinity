const bcrypt = require('bcrypt');

const { User } = require('../models/index'); // sequelize의 모델
// const AuthRepository = require('../repositories/auth.repository');

const jwt = require('jsonwebtoken');

require('dotenv').config();

// Service layer
const AuthService = require('../services/auth.service.js');

class AuthController {
    auth_service = new AuthService(User); // AuthService의 인스턴스 생성성
    // auth_repository = new AuthRepository(User);
    // 회원가입
    signup = async (req, res, next) => {
        try {
            const { email, name, password, phone, address, admin, raiting } =
                req.body;

            console.log(email, name, password, phone, address, admin, raiting);

            // Value 없을시 에러처리
            // if(!email || !name || !password || !phone || !address || !admin || !raiting ) {
            //   return res.status(400).json({message: '모든 값을 입력하세요'})
            // }

            const found_by_email = await this.auth_service.findByEmail(email);

            // 이메일 중복검사
            if (found_by_email) {
                return res
                    .status(409)
                    .json({ message: '이미 사용중인 이메일입니다.' });
            }

            // bcrypt를 이용한 비밀번호 암호화(Saltrounds = 12)
            const hashed = await bcrypt.hash(password, 12);
            const create_user = await this.auth_service.createUser(
                email,
                name,
                hashed,
                phone,
                address,
                admin,
                raiting
            );
            return res.status(201).json({
                data: create_user,
                message: '회원가입에 성공하였습니다',
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
    };

    // 로그인

    signin = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.auth_service.findByEmail(email);

            const passwordTest = await bcrypt.compare(
                password,
                user.dataValues.password
            );

            if (user.length === 0 || !passwordTest) {
                return res.status(401).json({
                    message: '사용자가 없거나 비밀번호가 틀렸습니다!',
                });
            }

            // access token 생성
            const access_token = jwt.sign(
                {
                    user_id: user.dataValues.user_id,
                    email: user.dataValues.email,
                    admin: user.dataValues.admin,
                },
                process.env.ACCESSTOKEN_SECRET_KEY,
                { expiresIn: '1s' }
            );

            // Refresh token 발급

            const refresh_token = jwt.sign(
                {
                    user_id: user.dataValues.user_id,
                    email: user.dataValues.email,
                    admin: user.dataValues.admin,
                },
                process.env.REFRESHTOKEN_SECRET_KEY,
                { expiresIn: '7d' }
            );

            res.cookie('accessToken', access_token);
            res.cookie('refreshToken', refresh_token);
            return res
                .status(200)
                .json({ access_token, refresh_token, msg: '로그인 완료!' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ msg: '로그인 실패' });
        }
    };

    //로그아웃
    signout = async (req, res) => {
        res.clearCookie('accessToken');
        return res.json({ msg: '로그아웃 성공' });
    };
}

module.exports = AuthController;
