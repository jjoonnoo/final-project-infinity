const SearchService = require('../services/search.service');

class SearchController {
    searchService = new SearchService();

    search = async (req, res, next) => {
        const { searchkeyword } = req.params;

        try {
            let limit = 3;
            let offset = 0 + (req.query.page - 1) * limit;
            const searchList = await this.searchService.searchList(
                limit,
                offset,
                searchkeyword
            );
            let count = (searchList.AuctionSearchList.count +=
                searchList.GeneralSearchList.count);
            let searchlists = searchList.AuctionSearchList.rows.concat(
                searchList.GeneralSearchList.rows
            );
            return res.status(200).json({
                totalPage: Math.ceil(count / limit),
                data: searchlists,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };

    getList = async (req, res, next) => {
        try {
            let page = Math.abs(parseInt(req.query.page));
            let limit = Math.abs(parseInt(req.query.limit));
            page = !isNaN(page) ? page : 1;
            limit = !isNaN(limit) ? limit : 6;
            // const limit = 6;
            let offset = 0
            if(page > 1){
                offset = limit * (page - 1);
              }
            const List = await this.searchService.findList(limit, offset);
            let count = (List.AuctionList.count += List.GeneralList.count);
            let lists = List.AuctionList.rows.concat(List.GeneralList.rows);
            // console.log(lists)
            return res.status(200).json({
                totalPage: Math.ceil(count / limit),
                data: lists,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };

    getAuctionProduct = async (req, res, next) => {
        try {
            let limit = 3;
            let offset = 0 + (req.query.page - 1) * limit;
            const AuctionProduct = await this.searchService.findAuctionProduct(
                limit,
                offset
            );
            console.log(AuctionProduct)
            return res.status(200).json({
                totalPage: Math.ceil(AuctionProduct.count / limit),
                data: AuctionProduct.rows,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };

    getGeneralProduct = async (req, res, next) => {
        try {
            let limit = 3;
            let offset = 0 + (req.query.page - 1) * limit;
            const GeneralProduct = await this.searchService.findGeneralProduct(
                limit,
                offset
            );
            console.log(GeneralProduct)
            return res.status(200).json({
                totalPage: Math.ceil(GeneralProduct.count / limit),
                data: GeneralProduct.rows,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };
}

module.exports = SearchController;
