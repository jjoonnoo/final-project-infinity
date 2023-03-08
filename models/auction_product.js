'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auction_product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Auction_product.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            models.Auction_product.hasOne(models.Auction_order, {
                foreignKey: 'auction_product_id',
            });
            models.Auction_product.hasOne(models.Review, {
                foreignKey: 'auction_product_id',
            });
            models.Auction_product.hasOne(models.Report, {
                foreignKey: 'auction_product_id',
            });
            models.Auction_product.hasMany(models.Image, {
                foreignKey: 'auction_product_id',
            });
        }
    }
    Auction_product.init(
        {
            auction_product_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            product_content: DataTypes.STRING,
            product_start_price: DataTypes.INTEGER,
            product_buy_now_price: DataTypes.INTEGER,
            product_update_price: DataTypes.INTEGER,
            product_start: DataTypes.DATE,
            product_end: DataTypes.DATE,
            category: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Auction_product',
        }
    );
    return Auction_product;
};
