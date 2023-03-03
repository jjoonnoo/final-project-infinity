'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class General_order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.General_order.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            models.General_order.hasMany(models.General_order_info, {
                foreignKey: 'general_order_id',
            });
        }
    }
    General_order.init(
        {
            general_order_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'General_order',
        }
    );
    return General_order;
};
