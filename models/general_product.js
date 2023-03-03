'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class General_product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.General_product.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            models.General_product.hasMany(models.Question, {
                foreignKey: 'general_product_id',
            });
            models.General_product.hasOne(models.Cart, {
                foreignKey: 'general_product_id',
            });
            models.General_product.hasMany(models.General_order_info, {
                foreignKey: 'general_product_id',
            });
            models.General_product.hasMany(models.Review, {
                foreignKey: 'general_product_id',
            });
            models.General_product.hasMany(models.Report, {
                foreignKey: 'general_product_id',
            });
            models.General_product.hasMany(models.Image, {
                foreignKey: 'general_product_id',
            });
        }
    }
    General_product.init(
        {
            general_product_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            product_content: DataTypes.STRING,
            product_price: DataTypes.INTEGER,
            category: DataTypes.STRING,
            raiting: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'General_product',
        }
    );
    return General_product;
};
