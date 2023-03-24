'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Login_session extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Login_session.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
        }
    }
    Login_session.init(
        {
            login_session_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            device_type: DataTypes.STRING,
            refresh_token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Login_session',
        }
    );
    return Login_session;
};
