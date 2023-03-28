const {
    General_product,
    Auction_product,
    Review,
    Cart,
    Report,
    User,
    Image,
    General_order_info,
    General_order,
    Login_session,
} = require('../models');

class AuthRepository {
    findByEmail = async (email) => {
        const user = await User.findOne({
            where: { email: email },
        });
        return user;
    };

    createUser = async (
        email,
        name,
        hashed,
        phone,
        address,
        admin,
        raiting
    ) => {
        const user_data = await User.create({
            email,
            name,
            password: hashed,
            phone,
            address,
            admin,
            raiting,
        });
        return user_data;
    };
    createLoginInfo = async (user_id, refresh_token, device_type) => {
        await Login_session.create({ user_id, refresh_token, device_type });
    };
    findLoginInfo = async (user_id, device_type) => {
        const loginInfo = await Login_session.findOne({
            where: { user_id: user_id, device_type: device_type },
        });
        return loginInfo;
    };
    updateLoginInfo = async (user_id, refresh_token, device_type) => {
        await Login_session.update(
            { refresh_token: refresh_token },
            { where: { user_id: user_id, device_type: device_type } }
        );
    };
}

module.exports = AuthRepository;
