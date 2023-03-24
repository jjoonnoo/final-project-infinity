'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Carts', {
            cart_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            general_product_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            product_quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 1,
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
        await queryInterface.addConstraint('Carts', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'FK_Carts_Users',
            references: {
                table: 'Users',
                field: 'user_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('Carts', {
            fields: ['general_product_id'],
            type: 'foreign key',
            name: 'FK_Carts_General_products',
            references: {
                table: 'General_products',
                field: 'general_product_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Carts');
    },
};
