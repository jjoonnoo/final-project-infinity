const {
    General_product,
    Auction_product,
    Review,
    Cart,
    Report,
    User,
    Image,
    Auction_order,
    General_order_info,
    General_order,
} = require('../models');
const { Op } = require('sequelize');
const now = new Date();
const offset = 9 * 60; // KST의 UTC Offset (9시간)
const kstNow = new Date(now.getTime() + offset * 60 * 1000);
class OrderRepository {
    getPurchaseHistory = async (user_id) => {
        const general_data = await General_order.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: General_order_info,
                    attributes: ['product_quantity'],
                    include: [
                        {
                            model: General_product,
                            attributes: [
                                'general_product_id',
                                'product_name',
                                'product_content',
                                'product_price',
                                'category',
                            ],
                            include: [
                                {
                                    model: Image,
                                    attributes: ['image_url'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        const auction_data = await Auction_order.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: Auction_product,
                    attributes: [
                        'auction_product_id',
                        'product_name',
                        'product_end',
                        'category',
                        'product_update_price',
                    ],
                    include: [
                        {
                            model: Image,
                            attributes: ['image_url'],
                        },
                    ],
                },
            ],
        });
        return { general_data, auction_data };
    };
    getSaleHistory = async (user_id) => {
        const auction_data = await Auction_product.findAll({
            where: {
                user_id: user_id,
                [Op.and]: [
                    {
                        updatedAt: {
                            [Op.lt]: now,
                        },
                    },
                    {
                        product_end: {
                            [Op.lt]: kstNow,
                        },
                    },
                ],
            },
            include: [
                {
                    model: Auction_order,
                    attributes: ['auction_order_id', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['name', 'email', 'address'],
                        },
                    ],
                },
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
        });

        const general_data = await General_product.findAll({
            where: {
                user_id: user_id,
            },
            include: [
                {
                    model: General_order_info,
                    attributes: ['general_order_id', 'product_quantity'],
                    include: [
                        {
                            model: General_order,
                            attributes: ['user_id'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['name', 'email', 'address'],
                                },
                            ],
                        },
                    ],
                },
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
        });

        return { auction_data, general_data };
    };
}
module.exports = OrderRepository;
