'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('General_order_infos', {
            general_order_info_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            general_product_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            general_order_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            product_quantity: {
                allowNull: false,
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
        await queryInterface.addConstraint('General_order_infos', {
            fields: ['general_product_id'],
            type: 'foreign key',
            name: 'FK_General_order_infos_General_products',
            references: {
                table: 'General_products',
                field: 'general_product_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('General_order_infos', {
            fields: ['general_order_id'],
            type: 'foreign key',
            name: 'FK_General_order_infos_General_orders',
            references: {
                table: 'General_orders',
                field: 'general_order_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('General_order_infos');
    },
};
