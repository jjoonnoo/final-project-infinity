'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('General_products', {
            general_product_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            product_name: {
                type: Sequelize.STRING,
            },
            product_content: {
                type: Sequelize.STRING,
            },
            product_price: {
                type: Sequelize.INTEGER,
            },
            category: {
                type: Sequelize.STRING,
            },
            rating: {
                type: Sequelize.FLOAT,
                defaultValue: 5.0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        await queryInterface.addConstraint('General_products', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'FK_General_products_Users',
            references: {
                table: 'Users',
                field: 'user_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('General_products');
    },
};
