const ListService = require('../services/list.service');

class ListController {
  listService= new ListService();

  getList = async (req, res, next) => {
    try {
      let limit = 3;
      let offset = 0 + (req.query.page - 1) * limit;
      const List = await this.listService.findList(
        limit,
        offset
      );
      return res.status(200).json({
        totalPage: Math.ceil(List.count / limit),
        data: List.rows,
      });
    } catch (error) {
      res.status(444).json({ errorMessage: error.message });
    }
  };
}