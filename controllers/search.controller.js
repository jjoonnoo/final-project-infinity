const MainService = require('../services/search.service');

class MainController {
    mainService = new MainService();

    search = async (req, res, next) => {
        const { searchkeyword } = req.params;
        try {
            let limit = 3;
            let offset = 0 + (req.query.page - 1) * limit;
            const List = await this.mainService.searchList(
                limit,
                offset,
                searchkeyword
            );
            const sortedArray = await this.BuyService.sortList(List);
            return res.status(200).json({
                totalPage: Math.ceil(List.count / limit),
                data: sortedArray.rows,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };

    getList = async (req, res, next) => {
        try {
            let limit = 3;
            let offset = 0 + (req.query.page - 1) * limit;
            const List = await this.mainService.findList(limit, offset);
            return res.status(200).json({
                totalPage: Math.ceil(List.count / limit),
                data: List.rows,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };

    getAuctionProduct = async (req, res, next) => {
        try {
            let limit = 3;
            let offset = 0 + (req.query.page - 1) * limit;
            const AuctionProduct = await this.mainService.findAuctionProduct(
                limit,
                offset
            );
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
            const GeneralProduct = await this.mainService.findGeneralProduct(
                limit,
                offset
            );
            return res.status(200).json({
                totalPage: Math.ceil(GeneralProduct.count / limit),
                data: GeneralProduct.rows,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };
}

module.exports = MainController;
