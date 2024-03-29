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
    signup = async (req, res) => {
        try {
            const { email, name, password, phone, address, admin, rating } =
                req.body;

            const found_by_email = await this.auth_service.findByEmail(email);

            // 이메일 중복검사
            if (found_by_email) {
                return res.status(409).json({
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
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // 로그인

    signin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await this.auth_service.findByEmail(email);
            const passwordTest = await bcrypt.compare(password, user.password);
            const user_agent = req.headers['x-user-agent'];
            const detector = new DeviceDetector({
                clientIndexes: true,
                deviceIndexes: true,
                deviceAliasCode: false,
            });
            const user_device_type = detector.detect(user_agent).device['type'];
            const ip = request_ip.getClientIp(req);
            const ip_info = await ipinfo(ip, process.env.IPINFO_TOKEN);
            if (
                !(ip === '127.0.0.1') &&
                !whitelist.countries.includes(ip_info.country)
            ) {
                return res.status(403).json({
                    message: 'vpn이 켜져있으시다면 끄고 다시 시도해 주세요',
                });
            }
            const login_info = await this.auth_service.findLoginInfo(
                user.user_id,
                user_device_type
            );
            if (user.length === 0 || !passwordTest) {
                return res
                    .status(401)
                    .json('사용자가 없거나 비밀번호가 틀렸습니다!');
            }
            if (req.cookies.access_token) {
                return res.json({ message: '이미 로그인 되어있습니다.' });
            }

            const refresh_token = jwt.sign(
                {
                    user_id: user.user_id,
                    email: user.email,
                    admin: user.admin,
                    device_type: user_device_type,
                },
                process.env.REFRESHTOKEN_SECRET_KEY,
                { expiresIn: '7d' }
            );

            const access_token = jwt.sign(
                {
                    user_id: user.user_id,
                    email: user.email,
                    admin: user.admin,
                    device_type: user_device_type,
                },
                process.env.ACCESSTOKEN_SECRET_KEY,
                { expiresIn: '1h' }
            );
            if (login_info) {
                if (login_info.refresh_token) {
                    await this.auth_service.updateLoginInfo(
                        user.user_id,
                        refresh_token,
                        user_device_type
                    );
                }
            } else {
                await this.auth_service.createLoginInfo(
                    user.user_id,
                    refresh_token,
                    user_device_type
                );
            }

            res.cookie('access_token', access_token)
                .cookie('refresh_token', refresh_token)
                .status(200)
                .json({ msg: '로그인 성공' });
        } catch (error) {
            res.status(400).json({ msg: '이메일 또는 비밀번호를 확인하세요' });
        }
    };

    signout = async (req, res) => {
        res.clearCookie('access_token')
            .clearCookie('refresh_token')
            .json({ msg: '로그아웃 성공' });
    };
}

module.exports = AuthController;
