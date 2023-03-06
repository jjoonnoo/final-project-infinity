const { Products } = require('../models');
const { Orders } = require('../models');
const Op = require('sequelize').Op;

class MainRepository {
    findList = async () => {
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
}

module.exports = MainRepository;
