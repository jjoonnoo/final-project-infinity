const { General_product } = require('../models');
const { Auction_product } = require('../models');
const { Products } = { General_product, Auction_product };
const Op = require('sequelize').Op;

class MainRepository {
    searchList = async () => {
        const List = await Products.findAndCountAll({
            where: {
                product_name: {
                    [Op.like]: '%' + req.body.searchkeyword + '%',
                    // "%" + [단어] + "%"를 통해 [단어]가 포함된 모든것 검색 가능
                },
            },
            order: [['id', 'ASC']],
            raw: true,
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
}

module.exports = MainRepository;
