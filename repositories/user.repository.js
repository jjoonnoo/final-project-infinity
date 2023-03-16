const { User } = require('../models');

class UserRepository {
    getMyInfo = async (user_id) => {
        const data = await User.findOne({ where: { user_id: user_id } });
        return data;
    };
    modifyUser = async (user_id, email, name, address, phone, password) => {
        const data = await User.update(
            {
                email: email,
                name: name,
                address: address,
                phone: phone,
                password: password,
            },
            { where: { user_id: user_id } }
        );
        return data;
    };
    deleteUser = async (user_id) => {
        const data = await User.destroy({ where: { user_id: user_id } });
        return data;
    };
}

module.exports = UserRepository;
