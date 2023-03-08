const MainRepository = require('../repositories/search.repository');
const { General_product } = require('../models');
const { Auction_product } = require('../models');
const { Products } = { General_product, Auction_product };

class MainService {
    mainRepository = new MainRepository(Products);

    searchList = async (
        limit,
        offset,
        searchkeyword,
        auction_product_id,
        general_product_id
    ) => {
        const List = await this.mainRepository.searchList(
            limit,
            offset,
            searchkeyword,
            auction_product_id,
            general_product_id
        );

        return List;
    };
    sortList = async (List) => {
        let sortedArray = new Array();
        for (let i = 0; i < List.length; i++) {
            let Product = await this.mainRepository.findById(List[i].productId);
            let image = await this.mainRepository.findId(List[i].imageId);

            let sortedOrder = {
                image: image.image_url,
            };
            sortedArray.push(sortedOrder);
        }
        return sortedArray;
    };

    findList = async (limit, offset) => {
        const List = await this.mainRepository.findList(limit, offset);

        return List;
    };

    findAuctionProduct = async (limit, offset) => {
        const AuctionProduct = await this.mainRepository.findAuctionProduct(
            limit,
            offset
        );

        return AuctionProduct;
    };

    findGeneralProduct = async (limit, offset) => {
        const GeneralProduct = await this.mainRepository.findGeneralProduct(
            limit,
            offset
        );

        return GeneralProduct;
    };
}
module.exports = MainService;
