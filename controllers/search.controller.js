const MainService = require('../services/search.service');

class MainController {
    mainService = new MainService();

    search = async (req, res, next) => {
        const { searchkeyword } = req.body;
        try {
            const List = await this.mainService.searchList(searchkeyword);
            return res.status(200).json({
                data: List.rows,
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
}

module.exports = MainController;
