const MainRepository = require('../repositories/search.repository');
const { Products } = require('../models');

class MainService {
    mainRepository = new MainRepository(Products);

    findList = async (searchkeyword) => {
        const List = await this.mainRepository.findList(searchkeyword);

        return List;
    };
}
module.exports = MainService;
