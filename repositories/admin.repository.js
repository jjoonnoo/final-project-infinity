const {
    General_product,
    Auction_product,
    Review,
    Cart,
    Report,
    User,
    Image,
    General_order_info,
    General_order,
    Auction_order,
} = require('../models');

class AdminRepository {
    getReports = async () => {
        const getReports = await Report.findAll({});

        return getReports;
    };

    delGeneralProduct = async (general_product_id) => {
        await General_product.destroy({
            where: { general_product_id: general_product_id },
        });
    };

    delAuctionProduct = async (auction_product_id) => {
        await Auction_product.destroy({
            where: { auction_product_id: auction_product_id },
        });
    };
}

module.exports = AdminRepository;
