const jwt = require('jsonwebtoken');
const { User, Login_session } = require('../models');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;
        jwt.verify(
            refresh_token,
            process.env.REFRESHTOKEN_SECRET_KEY,
            async (err, decoded) => {
                if (err) {
                    res.clearCookie('access_token')
                        .clearCookie('refresh_token')
                        .json({ message: '다시 로그인 해주세요.' });
                } else {
                    const session_info = await Login_session.findOne({
                        where: {
                            user_id: decoded.user_id,
                            device_type: decoded.device_type,
                        },
                    });
                    if (session_info.refresh_token === refresh_token) {
                        jwt.verify(
                            access_token,
                            process.env.ACCESSTOKEN_SECRET_KEY,
                            async (err, decoded) => {
                                if (err) {
                                    const access_token = jwt.sign(
                                        {
                                            user_id: decoded.user_id,
                                            email: decoded.email,
                                            admin: decoded.admin,
                                            device_type: decoded.device_type,
                                        },
                                        process.env.ACCESSTOKEN_SECRET_KEY,
                                        { expiresIn: '1d' }
                                    );
                                    res.clearCookie('access_token')
                                        .status(201)
                                        .cookie('access_token', access_token);
                                    const current_user = await User.findOne({
                                        where: {
                                            user_id: decoded.user_id,
                                        },
                                    });
                                    res.locals.user = current_user.dataValues;
                                    next();
                                } else {
                                    const current_user = await User.findOne({
                                        where: {
                                            user_id: decoded.user_id,
                                        },
                                    });
                                    res.locals.user = current_user.dataValues;
                                    next();
                                }
                            }
                        );
                    } else {
                        res.clearCookie('access_token')
                            .clearCookie('refresh_token')
                            .json({
                                message:
                                    '다른곳에서 로그인 되었습니다. 다시 로그인 해주세요',
                            });
                    }
                }
            }
        );
    } catch (error) {
        res.status(401).json({ message: '로그인 후 이용가능합니다!' });
    }
};
