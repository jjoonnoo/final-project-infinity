'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Image.belongsTo(models.Auction_product, {
                foreignKey: 'auction_product_id',
            });
            models.Image.belongsTo(models.General_product, {
                foreignKey: 'general_product_id',
            });
        }
    }
    Image.init(
        {
            image_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            auction_product_id: DataTypes.INTEGER,
            general_product_id: DataTypes.INTEGER,
            image_url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Image',
        }
    );
    return Image;
};
