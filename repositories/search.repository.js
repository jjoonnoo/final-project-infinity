const { General_product } = require('../models');
const { Auction_product } = require('../models');
const { Products } = { General_product, Auction_product };
const Op = require('sequelize').Op;
const { Image } = require('../models');

class MainRepository {
    searchList = async (
        limit,
        offset,
        searchkeyword,
        auction_product_id,
        general_product_id
    ) => {
        const List = await Products.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                        product_content: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                        category: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                        product_buy_now_price: {
                            [Op.like]: '%' + searchkeyword + '%',
                        },
                    },
                ],
            },
            order: [['updatedAt', 'ASC']],
            raw: true,
            offset: offset,
            limit: limit,
            auction_product_id,
            general_product_id,
        });
        return List;
    };

    // getProductDataById = async (productId) => {
    //     try {
    //       const productData = await this.Products.findAll({
    //         where: { productId },
    //       });
    //       return productData;
    //     } catch (error) {
    //       error.status = 500;
    //       throw error;
    //     }
    //   };
    findList = async (limit, offset) => {
        const List = await Products.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [['updatedAt', 'ASC']],
        });
        return List;
    };

    findAuctionProduct = async (limit, offset) => {
        const AuctionProduct = await Auction_product.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [['updatedAt', 'ASC']],
        });
        return AuctionProduct;
    };

    findGeneralProduct = async (limit, offset) => {
        const GeneralProduct = await General_product.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [['updatedAt', 'ASC']],
        });
        return GeneralProduct;
    };

    findById = async (auction_product_id, general_product_id) => {
        const productId = await Products.findOne({
            where: {
                [Op.or]: [
                    {
                        auction_product_id,
                        general_product_id,
                    },
                ],
            },
        });
        return productId;
    };

    findId = async (image_id) => {
        const imageId = await Image.findOne({
            where: { image_id },
        });
        return imageId;
    };
}

module.exports = MainRepository;
