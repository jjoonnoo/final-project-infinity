const UserRepositoty = require('../repositories/user.repository');

class UserService {
    userRepository = new UserRepositoty();
}

module.exports = UserService;
