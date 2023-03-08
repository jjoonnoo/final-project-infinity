const ProductRepositoty = require('../repositories/product.repository');

class ProductService {
    productRepository = new ProductRepositoty();
    generalProductRegist = async (
        user_id,
        product_name,
        product_content,
        product_price,
        category,
        img_url
    ) => {
        const data = await this.productRepository.generalProductRegist(
            user_id,
            product_name,
            product_content,
            product_price,
            category,
            img_url
        );
        return data;
    };
    generalProductModify = async (
        user_id,
        product_name,
        product_content,
        product_price,
        category,
        img_url
    ) => {
        try {
            await this.productRepository.generalProductModify(
                user_id,
                product_name,
                product_content,
                product_price,
                category,
                img_url
            );
        } catch (error) {
            throw error;
        }
    };
    generalProductDelete = async (general_product_id) => {
        try {
            await this.productRepository.generalProductDelete(
                general_product_id
            );
        } catch (error) {
            throw error;
        }
    };
    auctionProductRegist = async (
        user_id,
        product_name,
        product_content,
        product_start_price,
        product_buy_now_price,
        product_start,
        product_end,
        category,
        img_url
    ) => {
        try {
            await this.productRepository.auctionProductRegist(
                user_id,
                product_name,
                product_content,
                product_start_price,
                product_buy_now_price,
                product_start,
                product_end,
                category,
                img_url
            );
        } catch (error) {
            throw error;
        }
    };
    auctionProductModify = async (
        auction_product_id,
        product_name,
        product_content,
        product_start_price,
        product_buy_now_price,
        product_start,
        product_end,
        category,
        img_url
    ) => {
        try {
            await this.productRepository.auctionProductModify(
                auction_product_id,
                product_name,
                product_content,
                product_start_price,
                product_buy_now_price,
                product_start,
                product_end,
                category,
                img_url
            );
        } catch (error) {
            throw error;
        }
    };
    auctionProductDelete = async (auction_product_id) => {
        try {
            await this.productRepository.auctionProductDelete(
                auction_product_id
            );
        } catch (error) {
            throw error;
        }
    };
    findMyProduct = async (user_id) => {
        try {
            const data = await this.productRepository.findMyProduct(user_id);
            return data;
        } catch (error) {
            throw error;
        }
    };

    findOneProduct = async (general_product_id) => {
        try {
            const data = await this.productRepository.findOneProduct(
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
            const data = await this.productRepository.productAddCart({
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
            const data = await this.productRepository.reportProduct({
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

module.exports = ProductService;
