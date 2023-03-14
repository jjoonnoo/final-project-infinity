const { General_product } = require('../models');
const { Auction_product } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { Image } = require('../models');

class SearchRepository {
    searchList = async (limit, offset, searchkeyword) => {
        const GeneralSearchList = await General_product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_content: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        category: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                ],
            },
            order: [['updatedAt', 'ASC']],
            raw: true,
            offset: offset,
            limit: limit,
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            subQuery: false,
            group: [
                'General_product.general_product_id',
                'Images.general_product_id',
            ],
        });

        const GeneralCount = await General_product.count({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_content: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        category: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                ],
            },
            distinct: true,
            col: 'general_product_id',
            includeIgnoreAttributes: false,
            subQuery: false,
            attributes: [
                [
                    sequelize.literal(
                        'COUNT(DISTINCT `General_product`.`general_product_id`)'
                    ),
                    'count',
                ],
            ],
        });

        const AuctionSearchList = await Auction_product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_content: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        category: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_buy_now_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_start_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_update_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                ],
            },
            order: [['updatedAt', 'ASC']],
            raw: true,
            offset: offset,
            limit: limit,
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            subQuery: false,
            group: [
                'Auction_product.auction_product_id',
                'Images.auction_product_id',
            ],
        });

        const AuctionCount = await Auction_product.count({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_content: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        category: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_buy_now_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_start_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                    {
                        product_update_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                ],
            },
            distinct: true,
            col: 'auction_product_id',
            includeIgnoreAttributes: false,
            subQuery: false,
            attributes: [
                [
                    sequelize.literal(
                        'COUNT(DISTINCT `Auction_product`.`Auction_product_id`)'
                    ),
                    'count',
                ],
            ],
        });

        const count = { GeneralCount, AuctionCount };
        const searchList = { AuctionSearchList, GeneralSearchList, count };

        return searchList;
    };

    findList = async (limit, offset) => {
        const AuctionProduct = await Auction_product.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            raw: true,
            order: [['updatedAt', 'ASC']],
            offset: offset,
            limit: limit,
            subQuery: false,
            group: [
                'Auction_product.auction_product_id',
                'Images.auction_product_id',
            ],
        });

        const AuctionCount = await Auction_product.count({
            distinct: true,
            col: 'auction_product_id',
            includeIgnoreAttributes: false,
            subQuery: false,
            attributes: [
                [
                    sequelize.literal(
                        'COUNT(DISTINCT `Auction_product`.`Auction_product_id`)'
                    ),
                    'count',
                ],
            ],
        });

        const GeneralProduct = await General_product.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            raw: true,
            order: [['updatedAt', 'ASC']],
            offset: offset,
            limit: limit,
            subQuery: false,
            group: [
                'General_product.general_product_id',
                'Images.general_product_id',
            ],
        });

        const GeneralCount = await General_product.count({
            distinct: true,
            col: 'general_product_id',
            includeIgnoreAttributes: false,
            subQuery: false,
            attributes: [
                [
                    sequelize.literal(
                        'COUNT(DISTINCT `General_product`.`general_product_id`)'
                    ),
                    'count',
                ],
            ],
        });

        const count = { GeneralCount, AuctionCount };
        const List = { AuctionProduct, GeneralProduct, count };
        return List;
    };

    findAuctionProduct = async (limit, offset) => {
        const AuctionProducts = await Auction_product.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            raw: true,
            order: [['updatedAt', 'ASC']],
            offset: offset,
            limit: limit,
            subQuery: false,
            group: [
                'Auction_product.auction_product_id',
                'Images.auction_product_id',
            ],
        });

        const count = await Auction_product.count({
            distinct: true,
            col: 'auction_product_id',
            includeIgnoreAttributes: false,
            subQuery: false,
            attributes: [
                [
                    sequelize.literal(
                        'COUNT(DISTINCT `Auction_product`.`Auction_product_id`)'
                    ),
                    'count',
                ],
            ],
        });

        const AuctionProduct = { AuctionProducts, count };
        return AuctionProduct;
    };

    findGeneralProduct = async (limit, offset) => {
        const GeneralProducts = await General_product.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            raw: true,
            order: [['updatedAt', 'ASC']],
            offset: offset,
            limit: limit,
            subQuery: false,
            group: [
                'General_product.general_product_id',
                'Images.general_product_id',
            ],
        });

        const count = await General_product.count({
            distinct: true,
            col: 'general_product_id',
            includeIgnoreAttributes: false,
            subQuery: false,
            attributes: [
                [
                    sequelize.literal(
                        'COUNT(DISTINCT `General_product`.`general_product_id`)'
                    ),
                    'count',
                ],
            ],
        });

        const GeneralProduct = { GeneralProducts, count };
        return GeneralProduct;
    };

    recommendProducts = async () => {
        const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            9,
            0,
            0,
            0
        );
        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            32,
            59,
            59,
            999
        );
        const endOfHour = new Date(today.getTime() + 60 * 60 * 1000);
        console.log(today, startOfDay, endOfDay, endOfHour);
        const recommendProducts = await Auction_product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_end: {
                            [Op.between]: [today, endOfHour],
                        },
                    },
                    {
                        product_start: {
                            [Op.between]: [startOfDay, endOfDay],
                        },
                    },
                ],
            },
            raw: true,
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            subQuery: false,
            group: [
                'Auction_product.auction_product_id',
                'Images.auction_product_id',
            ],
        });
        if (!recommendProducts.length) {
            const allProducts = await Auction_product.findAll({
                where: {
                    createdAt: {
                        [Op.not]: null
                    }
                },
                raw: true,
                include: [
                    {
                        model: Image,
                        attributes: ['image_url'],
                    },
                ],
                subQuery: false,
                group: [
                    'Auction_product.auction_product_id',
                    'Images.auction_product_id',
                ],
            });
            return allProducts;
        } else {
            return recommendProducts;
        }        
    };
}

module.exports = SearchRepository;
