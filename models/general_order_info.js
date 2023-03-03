'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class General_order_info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.General_order_info.belongsTo(models.General_product, {
                foreignKey: 'general_product_id',
            });
            models.General_order_info.belongsTo(models.General_order, {
                foreignKey: 'general_order_id',
            });
        }
    }
    General_order_info.init(
        {
            general_order_info_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            general_product_id: DataTypes.INTEGER,
            general_order_id: DataTypes.INTEGER,
            product_quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'General_order_info',
        }
    );
    return General_order_info;
};
