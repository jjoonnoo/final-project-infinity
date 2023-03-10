const { General_product } = require('../models');
const { Auction_product } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { Image } = require('../models');

class SearchRepository {
    searchList = async (limit, offset, searchkeyword) => {
        const GeneralSearchList = await General_product.findAndCountAll({
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
        });
        const AuctionSearchList = await Auction_product.findAndCountAll({
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
        });
        const searchList = { AuctionSearchList, GeneralSearchList };
        console.log(searchList);
        return searchList;
    };

    findList = async (limit, offset) => {
        const GeneralList = await General_product.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [['updatedAt', 'ASC']],
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            subQuery: false,
        });
        const AuctionList = await Auction_product.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [['updatedAt', 'ASC']],
            include: [
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
            subQuery: false,
        });
        const List = { AuctionList, GeneralList };
        return List;
    };

    findAuctionProduct = async (limit, offset) => {
        const AuctionProduct = await Auction_product.findAndCountAll({
            include: {
                model: Image,
                attributes: ['image_url'],
            },
            raw: true,
            order: [['updatedAt', 'ASC']],
            offset: offset,
            limit: limit,
            subQuery: false,
        });
        return AuctionProduct;
    };

    findGeneralProduct = async (limit, offset) => {
        const GeneralProduct = await General_product.findAndCountAll({
            include: {
                model: Image,
                attributes: ['image_url'],
            },
            raw: true,
            order: [['updatedAt', 'ASC']],
            offset: offset,
            limit: limit,
            subQuery: false,
        });
        return GeneralProduct;
    };
}

module.exports = SearchRepository;
