const { General_product, Auction_product, Report } = require('../models');

class AdminRepository {
    getReports = async () => {
        const get_reports = await Report.findAll({});

        return get_reports;
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
