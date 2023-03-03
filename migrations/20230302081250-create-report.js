'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reports', {
            report_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            general_product_id: {
                type: Sequelize.INTEGER,
            },
            auction_product_id: {
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            content: {
                type: Sequelize.STRING,
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
        await queryInterface.addConstraint('Reports', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'FK_Reports_Users',
            references: {
                table: 'Users',
                field: 'user_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('Reports', {
            fields: ['general_product_id'],
            type: 'foreign key',
            name: 'FK_Reports_General_products',
            references: {
                table: 'General_products',
                field: 'general_product_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('Reports', {
            fields: ['auction_product_id'],
            type: 'foreign key',
            name: 'FK_Reports_Auction_products',
            references: {
                table: 'Auction_products',
                field: 'auction_product_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Reports');
    },
};
