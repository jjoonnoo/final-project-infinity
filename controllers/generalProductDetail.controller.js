const GeneralProductService = require('../services/generalProduct.service');

class GeneralProductDetailController {
    generalProductService = new GeneralProductService();

    findOneProduct = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            const data = await this.generalProductService.findOneProduct(
                general_product_id
            );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    productAddCart = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            // const user_id = 99
            const { general_product_id } = req.params;
            const { product_quantity } = req.body;

            console.log('요것은~!!', product_quantity);
            const data = await this.generalProductService.productAddCart({
                user_id,
                general_product_id,
                product_quantity,
            });

            res.status(201).json({ message: '장바구니에 담았습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    reportProduct = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            // const user_id = 99
            const { general_product_id } = req.params;
            const { title, content } = req.body;

            const data = await this.generalProductService.reportProduct({
                user_id,
                general_product_id,
                title,
                content,
            });

            res.status(201).json({ message: '신고가 완료되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = GeneralProductDetailController;
