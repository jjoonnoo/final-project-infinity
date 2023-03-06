const MainService = require('../services/search.service');

class MainController {
    mainService = new MainService();

    search = async (req, res, next) => {
        const { searchkeyword } = req.body;
        try {
            const List = await this.mainService.findList(searchkeyword);
            return res.status(200).json({
                data: List.rows,
            });
        } catch (error) {
            res.status(444).json({ errorMessage: error.message });
        }
    };
}

module.exports = MainController;
