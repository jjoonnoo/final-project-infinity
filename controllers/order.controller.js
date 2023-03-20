const OrderService = require('../services/order.service');

class OrderController {
    orderService = new OrderService();
    getPurchaseHistory = async (req, res) => {
        try {
            const user_id = res.locals.user.user_id;
            const data = await this.orderService.getPurchaseHistory(user_id);
            res.status(200).json({ data });
        } catch (error) {
            res.status(404).json({ message: '불러오기에 실패하였습니다' });
        }
    };
    getSaleHistory = async (req, res) => {
        try {
            const user_id = res.locals.user.user_id;
            const data = await this.orderService.getSaleHistory(user_id);
            res.status(200).json({ data });
        } catch (error) {
            res.status(404).json({ message: '불러오기에 실패하였습니다' });
        }
    };
}
module.exports = OrderController;
