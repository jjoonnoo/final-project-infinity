const AdminService = require('../services/admin.service');

class AdminController {
    adminService = new AdminService();
    getReports = async (req, res) => {
        try {
            const get_reports = await this.adminService.getReports();

            return res.status(200).json({
                data: get_reports,
            });
        } catch (error) {
            res.status(404).json({ errorMessage: error.message });
        }
    };

    delGeneralProduct = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            await this.adminService.delGeneralProduct(general_product_id);
            res.status(200).json({ message: 'successfully delete' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    delAuctionProduct = async (req, res) => {
        try {
            const { auction_product_id } = req.params;
            await this.adminService.delAuctionProduct(auction_product_id);
            res.status(200).json({ message: 'successfully delete' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

module.exports = AdminController;
