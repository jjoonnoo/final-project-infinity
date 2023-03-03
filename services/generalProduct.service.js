const GeneralProdcutRepositoty = require('../repositories/generalProduct.repository');

class GeneralProductService {
    generalProductRepository = new GeneralProdcutRepositoty();

    findOneProduct = async (general_product_id) => {
        try {
            const data = await this.generalProductRepository.findOneProduct(
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
            const data = await this.generalProductRepository.productAddCart({
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
            const data = await this.generalProductRepository.reportProduct({
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

module.exports = GeneralProductService;
