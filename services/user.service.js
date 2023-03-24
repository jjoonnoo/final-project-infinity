const UserRepositoty = require('../repositories/user.repository');

class UserService {
    userRepository = new UserRepositoty();
    getMyInfo = async (user_id) => {
        const data = await this.userRepository.getMyInfo(user_id);
        return data;
    };
    modifyUser = async (user_id, email, name, address, phone, password) => {
        const data = await this.userRepository.modifyUser(
            user_id,
            email,
            name,
            address,
            phone,
            password
        );
        return data;
    };

    deleteUser = async (user_id) => {
        const data = await this.userRepository.deleteUser(user_id);
        return data;
    };
}

module.exports = UserService;
