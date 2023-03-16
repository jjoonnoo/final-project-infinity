const SearchRepository = require('../repositories/search.repository');

class SearchService {
    searchRepository = new SearchRepository();

    searchList = async (limit, offset, searchkeyword) => {
        const searchList = await this.searchRepository.searchList(
            limit,
            offset,
            searchkeyword
        );

        return searchList;
    };

    findList = async (limit, offset) => {
        const List = await this.searchRepository.findList(limit, offset);

        return List;
    };

    findAuctionProduct = async (limit, offset) => {
        const AuctionProduct = await this.searchRepository.findAuctionProduct(
            limit,
            offset
        );

        return AuctionProduct;
    };

    findGeneralProduct = async (limit, offset) => {
        const GeneralProduct = await this.searchRepository.findGeneralProduct(
            limit,
            offset
        );

        return GeneralProduct;
    };

    recommendProducts = async () => {
        const recommendProducts =
            await this.searchRepository.recommendProducts();

        return recommendProducts;
    };

    autocomplete = async (query) => {
        const autocomplete = await this.searchRepository.autocomplete(query);

        return autocomplete;
    };

    productEndSoon = async () => {
        const productEndSoon = await this.searchRepository.productEndSoon();

        return productEndSoon;
    };
}
module.exports = SearchService;
