const AuthRepository = require('../repositories/auth.repository');

class AuthService {
    auth_repository = new AuthRepository();

    findByEmail = async (email) => {
        const user_by_email = await this.auth_repository.findByEmail(email);
        return user_by_email;
    };

    createUser = async (
        member_id,
        email,
        name,
        hashed,
        phone,
        address,
        type,
        star
    ) => {
        const created_user = await this.auth_repository.createUser(
            member_id,
            email,
            name,
            hashed,
            phone,
            address,
            type,
            star
        );
        return {
            member_id: created_user.member_id,
            email: created_user.email,
            name: created_user.name,
            password: created_user.password,
            phone: created_user.phone,
            address: created_user.address,
            type: created_user.type,
            star: created_user.star,
        };
    };
    createLoginInfo = async (user_id, refresh_token, device_type) => {
        await this.auth_repository.createLoginInfo(
            user_id,
            refresh_token,
            device_type
        );
    };
    findLoginInfo = async (user_id, device_type) => {
        const login_info = await this.auth_repository.findLoginInfo(
            user_id,
            device_type
        );
        return login_info;
    };
    updateLoginInfo = async (user_id, refresh_token, device_type) => {
        await this.auth_repository.updateLoginInfo(
            user_id,
            refresh_token,
            device_type
        );
    };
}

module.exports = AuthService;
