const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const access_token = authHeader.split(' ')[1];
        const payload = jwt.decode(access_token);
        const refreshToken = payload.refresh_token;
        const user_id = payload.user_id;

        // err가 jwt expired 이고 decode한 refreshToken이 있으면
        // 재발급해서 보내주기.

        jwt.verify(
            access_token,
            process.env.ACCESSTOKEN_SECRET_KEY,
            async (err, decoded) => {
                if (err && refreshToken) {
                    const access_token = jwt.sign(
                        {
                            payload,
                        },
                        process.env.ACCESSTOKEN_SECRET_KEY,
                        { expiresIn: '1d' }
                    );
                    res.status(201).json({
                        access_token,
                        msg: 'accessToken recreated',
                    });
                } else {
                    const current_user = await User.findByPk(user_id);
                    res.locals.user = current_user.dataValues;
                    next();
                }
            }
        );
    } catch (error) {
        res.status(401).json({ message: '로그인 후 이용가능합니다!' });
    }
};

// );

// const { cookie } = req.headers;

// 쿠키검증
//   if (!cookie) {
//       return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
//   }

//   const [acc, ref] = cookie.split('; ');

//   let [accToken, access_token] = acc.split('=');
//   const [refToken, refresh_token] = ref.split('=');

//   if (!access_token && refresh_token) {
//     const new_access_token = jwt.sign(
//       {
//           user_id: User.dataValues.user_id,
//           email: User.dataValues.email,
//           admin: User.dataValues.admin,
//       },
//       process.env.ACCESSTOKEN_SECRET_KEY,
//       { expiresIn: '1s' }
//     );
//     res.cookie('accessToken', new_access_token);
//   }

//   if(!refresh_token) {
//     res.status(401).send({ message: '재 로그인 후 이용가능합니다' });
//       return;
//   }

//   // Token 검증 및 Decode 후 user_id 추출
//   try {
//       const { user_id } = jwt.verify(
//           access_token,
//           process.env.ACCESSTOKEN_SECRET_KEY
//       );

//       // Decoded된 user_id를 바탕으로 사용자 정보를 찾은 후
//       // res.locals.user 설정

//       User.findByPk(user_id).then((User) => {
//           res.locals.user = User;
//           console.log(User.dataValues);
//       });
//       next();
//   } catch (error) {
//       console.log(error);
//       return res.status(401).json({ message: '로그인 후 이용가능합니다!' });
//   }
// }
