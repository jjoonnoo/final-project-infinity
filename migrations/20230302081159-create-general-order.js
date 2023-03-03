'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('General_orders', {
            general_order_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
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
        await queryInterface.addConstraint('General_orders', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'FK_General_orders_Users',
            references: {
                table: 'Users',
                field: 'user_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('General_orders');
    },
};
