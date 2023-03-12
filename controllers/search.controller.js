const SearchService = require('../services/search.service');

class SearchController {
    searchService = new SearchService();

    search = async (req, res, next) => {
        let { searchkeyword } = req.params;
        searchkeyword = searchkeyword.replace(' ', '%');
        try {
            let limit = 5;
            let offset = 0 + (req.query.page - 1) * limit;
            const searchList = await this.searchService.searchList(
                limit,
                offset,
                searchkeyword
            );
            let count = (searchList.count.AuctionCount +=
                searchList.count.GeneralCount);
            let searchlists = searchList.AuctionSearchList.concat(
                searchList.GeneralSearchList
            );
            return res.status(200).json({
                totalPage: Math.ceil(count / limit),
                data: searchlists,
            });
        } catch (error) {
            res.status(404).json({ errorMessage: error.message });
        }
    };

    getList = async (req, res, next) => {
        try {
            let limit = 5;
            let offset = 0 + (req.query.page - 1) * limit;
            const List = await this.searchService.findList(limit, offset);
            const count = Math.max(
                List.count.AuctionCount,
                List.count.GeneralCount
            );
            return res.status(200).json({
                totalPage: Math.ceil(count / limit),
                dataAuction: List.AuctionProduct,
                dataGeneral: List.GeneralProduct,
            });
        } catch (error) {
            res.status(404).json({ errorMessage: error.message });
        }
    };

    getAuctionProduct = async (req, res, next) => {
        try {
            let limit = 5;
            let offset = 0 + (req.query.page - 1) * limit;
            const AuctionProduct = await this.searchService.findAuctionProduct(
                limit,
                offset
            );
            return res.status(200).json({
                totalPage: Math.ceil(AuctionProduct.count / limit),
                data: AuctionProduct.AuctionProducts,
            });
        } catch (error) {
            res.status(404).json({ errorMessage: error.message });
        }
    };

    getGeneralProduct = async (req, res, next) => {
        try {
            let limit = 5;
            let offset = 0 + (req.query.page - 1) * limit;
            const GeneralProduct = await this.searchService.findGeneralProduct(
                limit,
                offset
            );
            return res.status(200).json({
                totalPage: Math.ceil(GeneralProduct.count / limit),
                data: GeneralProduct.GeneralProducts,
            });
        } catch (error) {
            res.status(404).json({ errorMessage: error.message });
        }
    };
}

module.exports = SearchController;
