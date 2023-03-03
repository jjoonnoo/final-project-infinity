'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auction_order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Auction_order.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            models.Auction_order.belongsTo(models.Auction_product, {
                foreignKey: 'auction_product_id',
            });
        }
    }
    Auction_order.init(
        {
            auction_order_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            auction_product_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Auction_order',
        }
    );
    return Auction_order;
};
