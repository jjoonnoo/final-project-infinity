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
    getGeneralProduct = async (general_product_id) => {
        const data = await this.productRepository.getGeneralProduct(
            general_product_id
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
        await this.productRepository.generalProductModify(
            user_id,
            product_name,
            product_content,
            product_price,
            category,
            img_url
        );
    };
    generalProductDelete = async (general_product_id) => {
        await this.productRepository.generalProductDelete(general_product_id);
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
    };
    getAuctionProduct = async (auction_product_id) => {
        const data = await this.productRepository.getAuctionProduct(
            auction_product_id
        );
        return data;
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
    };
    auctionProductDelete = async (auction_product_id) => {
        await this.productRepository.auctionProductDelete(auction_product_id);
    };
    findMyProduct = async (user_id) => {
        const data = await this.productRepository.findMyProduct(user_id);
        return data;
    };

    generalProductFind = async (general_product_id) => {
        const data = await this.productRepository.generalProductFind(
            general_product_id
        );

        return data;
    };

    generalProductAddCart = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        const data = await this.productRepository.generalProductAddCart({
            user_id,
            general_product_id,
            product_quantity,
        });

        return data;
    };

    generalProductReport = async ({
        user_id,
        general_product_id,
        title,
        content,
    }) => {
        const data = await this.productRepository.generalProductReport({
            user_id,
            general_product_id,
            title,
            content,
        });

        return data;
    };

    generalProductFindCart = async (user_id) => {
        try {
            const data = await this.productRepository.generalProductFindCart(
                user_id
            );

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductPurchase = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        try {
            const data = await this.productRepository.generalProductPurchase({
                user_id,
                general_product_id,
                product_quantity,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductChangeQuantity = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        try {
            const data =
                await this.productRepository.generalProductChangeQuantity({
                    user_id,
                    general_product_id,
                    product_quantity,
                });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductFindCart = async (user_id) => {
        try {
            const data = await this.productRepository.generalProductFindCart(
                user_id
            );

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductPurchase = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        try {
            const data = await this.productRepository.generalProductPurchase({
                user_id,
                general_product_id,
                product_quantity,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductChangeQuantity = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        try {
            const data =
                await this.productRepository.generalProductChangeQuantity({
                    user_id,
                    general_product_id,
                    product_quantity,
                });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductDeleteCart = async ({ user_id, general_product_id }) => {
        try {
            const data = await this.productRepository.generalProductDeleteCart({
                user_id,
                general_product_id,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductDeleteCart = async ({ user_id, general_product_id }) => {
        try {
            const data = await this.productRepository.generalProductDeleteCart({
                user_id,
                general_product_id,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    auctionProductFind = async (auction_product_id) => {
        const data = await this.productRepository.auctionProductFind(
            auction_product_id
        );

        return data;
    };

    auctionProductReport = async ({
        user_id,
        auction_product_id,
        title,
        content,
    }) => {
        const data = await this.productRepository.auctionProductReport({
            user_id,
            auction_product_id,
            title,
            content,
        });

        return data;
    };

    auctionProductPriceUpdate = async ({
        bidder_id,
        auction_product_id,
        product_update_price,
        product_end,
    }) => {
        await this.productRepository.auctionProductPriceUpdate({
            bidder_id,
            auction_product_id,
            product_update_price,
            product_end,
        });
    };

    auctionProductPurchaseNowFind = async (auction_product_id, user_id) => {
        const data = await this.productRepository.auctionProductPurchaseNowFind(
            auction_product_id,
            user_id
        );

        return data;
    };

    auctionProductPurchaseNow = async ({
        user_id,
        auction_product_id,
        product_buy_now_price,
    }) => {
        await this.productRepository.auctionProductPurchaseNow({
            user_id,
            auction_product_id,
            product_buy_now_price,
        });
    };

    generalProductReview = async ({
        user_id,
        general_product_id,
        rating,
        content,
    }) => {
        const data = await this.productRepository.generalProductReview({
            user_id,
            general_product_id,
            rating,
            content,
        });

        return data;
    };

    auctionProductReview = async ({
        user_id,
        auction_product_id,
        rating,
        content,
    }) => {
        const reviewData = await this.productRepository.auctionProductReview({
            user_id,
            auction_product_id,
            rating,
            content,
        });

        return reviewData;
    };
}

module.exports = ProductService;
