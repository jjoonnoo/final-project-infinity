'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Question.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            models.Question.belongsTo(models.General_product, {
                foreignKey: 'general_product_id',
            });
        }
    }
    Question.init(
        {
            question_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            general_product_id: DataTypes.INTEGER,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Question',
        }
    );
    return Question;
};
