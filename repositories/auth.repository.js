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
} = require('../models');

class AuthRepository {
    // constructor(Model) {
    //     this.Model = Model;
    // }

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
}

module.exports = AuthRepository;
