'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Report.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            models.Report.belongsTo(models.General_product, {
                foreignKey: 'general_product_id',
            });
            models.Report.belongsTo(models.Auction_product, {
                foreignKey: 'auction_product_id',
            });
        }
    }
    Report.init(
        {
            report_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            general_product_id: DataTypes.INTEGER,
            auction_product_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Report',
        }
    );
    return Report;
};
