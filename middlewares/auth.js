const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

module.exports = (req, res, next) => {
    const { cookie } = req.headers;

    // 쿠키검증
    if (!cookie) {
        return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
    }

    [first, second] = cookie.split('; ');

    // console.log(cookie);

    const acc = first;
    const ref = second;

    const [accToken, access_token] = acc.split('=');
    const [refToken, refresh_token] = ref.split('=');

    console.log(refresh_token);

    // console.log(refresh_token);
    // [refTokenName, refresh_token] = ref.split("=")

    if (!access_token || accToken !== 'accessToken') {
        res.status(401).send({ message: '로그인 후 이용가능합니다' });
        return;
    }

    // Token 검증 및 Decode 후 user_id 추출
    try {
        const { user_id } = jwt.verify(
            access_token,
            process.env.ACCESSTOKEN_SECRET_KEY
        );

        // Decoded된 user_id를 바탕으로 사용자 정보를 찾은 후
        // res.locals.user 설정

        User.findByPk(user_id).then((User) => {
            res.locals.user = User;
            console.log(User.dataValues);
        });
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: '로그인 후 이용가능합니다!' });
    }
};
