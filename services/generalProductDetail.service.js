const GeneralProdcutDetailRepository = require('../repositories/generalProductDetail.repository');

class GeneralProductDetailService {
    generalProductDetailRepository = new GeneralProdcutDetailRepository();

    findOneProduct = async (general_product_id) => {
        try {
            const data = await this.generalProductDetailRepository.findOneProduct(
                general_product_id
            );

            return data;
        } catch (error) {
            throw error;
        }
    };

    productAddCart = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        try {
            const data = await this.generalProductDetailRepository.productAddCart({
                user_id,
                general_product_id,
                product_quantity,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    reportProduct = async ({ user_id, general_product_id, title, content }) => {
        try {
            const data = await this.generalProductDetailRepository.reportProduct({
                user_id,
                general_product_id,
                title,
                content,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = GeneralProductDetailService;
