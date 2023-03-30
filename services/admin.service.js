const AdminRepositoty = require('../repositories/admin.repository');

class AdminService {
    adminRepository = new AdminRepositoty();
    getReports = async () => {
        const get_reports = await this.adminRepository.getReports();

        return get_reports;
    };

    delGeneralProduct = async (general_product_id) => {
        await this.adminRepository.delGeneralProduct(general_product_id);
    };

    delAuctionProduct = async (auction_product_id) => {
        await this.adminRepository.delAuctionProduct(auction_product_id);
    };
}

module.exports = AdminService;
