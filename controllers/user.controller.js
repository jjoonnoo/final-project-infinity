const bcrypt = require('bcrypt');
require('dotenv').config();
const UserService = require('../services/user.service');
class UserController {
    userService = new UserService();
    getMyInfo = async (req, res) => {
        try {
            const user_id = res.locals.user.user_id;
            const data = await this.userService.getMyInfo(user_id);
            res.status(200).json({ data });
        } catch (error) {
            res.status(404).json({ message: '정보 불러오기 실패' });
        }
    };
    modifyUser = async (req, res) => {
        try {
            const { user_id } = req.params;
            const { email, name, address, phone, password } = req.body;
            const user_pwd = await this.userService.getMyInfo(user_id);
            if (!password) {
                const data = await this.userService.modifyUser(
                    user_id,
                    email,
                    name,
                    address,
                    phone,
                    user_pwd.password
                );
            } else {
                const hashed = await bcrypt.hash(password, 12);
                const data = await this.userService.modifyUser(
                    user_id,
                    email,
                    name,
                    address,
                    phone,
                    hashed
                );
            }

            res.status(200)
                .json({
                    message: '회원정보가 수정되었습니다. 다시 로그인 해주세요.',
                })
                .clearCookie('access_token')
                .clearCookie('refresh_token');
        } catch (error) {
            res.status(400).json({ message: '회원정보 수정 실패' });
        }
    };
    confirmUserPwd = async (req, res) => {
        try {
            const user_id = res.locals.user.user_id;
            const { password } = req.body;
            const user = await this.userService.getMyInfo(user_id);
            const passwordTest = await bcrypt.compare(password, user.password);
            if (user.length === 0 || !passwordTest) {
                return res.status(403).json({
                    message: '사용자가 없거나 비밀번호가 틀렸습니다!',
                });
            }
            res.status(200).json({ message: '비밀번호가 일치' });
        } catch (error) {
            res.status(400).json({ message: '비밀번호가 맞지 않습니다.' });
        }
    };
    deleteUser = async (req, res) => {
        try {
            const { user_id } = req.params;
            const data = await this.userService.deleteUser(user_id);
            res.status(200)
                .json({ message: '회원 탈퇴 성공' })
                .clearCookie('access_token')
                .clearCookie('refresh_token');
        } catch (error) {
            res.status(400).json({ message: '회원 탈퇴 실패' });
        }
    };
}

module.exports = UserController;
