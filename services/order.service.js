const OrderRepositoty = require('../repositories/order.repository');

class OrderService {
    orderRepository = new OrderRepositoty();
    getPurchaseHistory = async (user_id) => {
        const data = await this.orderRepository.getPurchaseHistory(user_id);
        return data;
    };
    getSaleHistory = async (user_id) => {
        const data = await this.orderRepository.getSaleHistory(user_id);
        return data;
    };
}
module.exports = OrderService;
