const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request_ip = require('request-ip');
const ipinfo = require('ipinfo');
const DeviceDetector = require('node-device-detector');
const whitelist = require('../whitelist.json');
require('dotenv').config();

// Service layer
const AuthService = require('../services/auth.service.js');

class AuthController {
    auth_service = new AuthService(); // AuthService의 인스턴스 생성성
    // 회원가입
    signup = async (req, res, next) => {
        try {
            const { email, name, password, phone, address, admin, rating } =
                req.body;

            // Value 없을시 에러처리
            // if(!email || !name || !password || !phone || !address || !admin || !raiting ) {
            //   return res.status(400).json({message: '모든 값을 입력하세요'})
            // }

            const found_by_email = await this.auth_service.findByEmail(email);

            // 이메일 중복검사
            if (found_by_email) {
                res.status(409).json({
                    message: '이미 사용중인 이메일입니다.',
                });
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
                rating
            );
            res.status(201).json({
                data: create_user,
                message: '회원가입에 성공하였습니다',
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    };

    // 로그인

    signin = async (req, res) => {
        try {
            const { email, password } = req.body;
            // const user_agent = req.headers['x-user-agent'];
            const detector = new DeviceDetector({
                clientIndexes: true,
                deviceIndexes: true,
                deviceAliasCode: false,
            });
            // const user_device_type = detector.detect(user_agent).device['type'];
            const user = await this.auth_service.findByEmail(email);
            const passwordTest = await bcrypt.compare(password, user.password);
            // const ip = "112.184.163.168" 내 아이피주소
            // const ip = "8.8.8.8" 미국
            // const ip = request_ip.getClientIp(req)
            // const ip_info = await ipinfo(ip,process.env.IPINFO_TOKEN)
            // if(!whitelist.countries.includes(ip_info.country)){
            //     return res.status(403).json({msg:'vpn이 켜져있으시다면 끄고 다시 시도해 주세요'})
            // }

            if (user.length === 0 || !passwordTest) {
                return res.status(401).json({
                    message: '사용자가 없거나 비밀번호가 틀렸습니다!',
                });
            }

            // Refresh token 발급

            const refresh_token = jwt.sign(
                {
                    user_id: user.user_id,
                    email: user.email,
                    admin: user.admin,
                },
                process.env.REFRESHTOKEN_SECRET_KEY,
                { expiresIn: '7d' }
            );

            // jwt토큰의 payload 안에 refresh token을 넣어서
            // access token을 발급하기

            const access_token = jwt.sign(
                {
                    user_id: user.dataValues.user_id,
                    email: user.dataValues.email,
                    admin: user.dataValues.admin,
                    refreshToken: refresh_token,
                },
                process.env.ACCESSTOKEN_SECRET_KEY,
                { expiresIn: '1d' }
            );

            return res.status(200).json({ access_token, msg: '로그인 완료!' });
        } catch (error) {
            // console.log(error);
            res.status(400).json({ msg: '로그인 실패' });
        }
    };

    signout = async (req, res) => {
        res.clearCookie('accessToken');
        res.json({ msg: '로그아웃 성공' });
    };
}

module.exports = AuthController;
