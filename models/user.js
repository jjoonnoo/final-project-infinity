'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Cart, {
                foreignKey: 'user_id',
            });
            models.User.hasMany(models.Question, {
                foreignKey: 'user_id',
            });
            models.User.hasMany(models.Report, {
                foreignKey: 'user_id',
            });
            models.User.hasMany(models.Review, {
                foreignKey: 'user_id',
            });
            models.User.hasMany(models.General_product, {
                foreignKey: 'user_id',
            });
            models.User.hasOne(models.Auction_product, {
                foreignKey: 'user_id',
            });
            models.User.hasMany(models.General_order, {
                foreignKey: 'user_id',
            });
            models.User.hasOne(models.Auction_order, {
                foreignKey: 'user_id',
            });
            models.User.hasMany(models.Login_session, {
                foreignKey: 'user_id',
            });
        }
    }
    User.init(
        {
            user_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            admin: DataTypes.INTEGER,
            rating: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
