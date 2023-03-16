'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Auction_products', {
            auction_product_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            product_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            product_content: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            product_start_price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            product_buy_now_price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            product_update_price: {
                type: Sequelize.INTEGER,
            },
            bidder_id: {
                type: Sequelize.INTEGER,
            },
            product_start: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            product_end: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            bid_count: {
                type: Sequelize.INTEGER,
            },
            category: {
                allowNull: false,
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
        await queryInterface.addConstraint('Auction_products', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'FK_Auction_products_Users',
            references: {
                table: 'Users',
                field: 'user_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Auction_products');
    },
};
