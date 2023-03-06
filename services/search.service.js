const MainRepository = require('../repositories/search.repository');
const { General_product } = require('../models');
const { Auction_product } = require('../models');
const { Products } = { General_product, Auction_product };

class MainService {
    mainRepository = new MainRepository(Products);

    searchList = async (searchkeyword) => {
        const List = await this.mainRepository.searchList(searchkeyword);

        return List;
    };

    findList = async (limit, offset) => {
        const List = await this.mainRepository.findList(limit, offset);

        return List;
    };
}
module.exports = MainService;
