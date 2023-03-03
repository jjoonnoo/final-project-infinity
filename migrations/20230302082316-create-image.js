'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Images', {
            image_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            auction_product_id: {
                type: Sequelize.INTEGER,
            },
            general_product_id: {
                type: Sequelize.INTEGER,
            },
            image_url: {
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
        await queryInterface.addConstraint('Images', {
            fields: ['auction_product_id'],
            type: 'foreign key',
            name: 'FK_Images_Auction_products',
            references: {
                table: 'Auction_products',
                field: 'auction_product_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('Images', {
            fields: ['general_product_id'],
            type: 'foreign key',
            name: 'FK_Images_General_products',
            references: {
                table: 'General_products',
                field: 'general_product_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Images');
    },
};
