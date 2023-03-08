const {
    General_product,
    Auction_product,
    Review,
    Cart,
    Report,
    User,
} = require('../models');

class ProductRepositoty {
    generalProductRegist = async (
        user_id,
        product_name,
        product_content,
        product_price,
        category
    ) => {
        try {
            await General_product.create({
                user_id: user_id,
                product_name: product_name,
                product_content: product_content,
                product_price: product_price,
                category: category,
            });
        } catch (error) {
            throw error;
        }
    };
    generalProductModify = async (
        general_product_id,
        product_name,
        product_content,
        product_price,
        category
    ) => {
        try {
            await General_product.update(
                {
                    product_name: product_name,
                    product_content: product_content,
                    product_price: product_price,
                    category: category,
                },
                { where: { general_product_id: general_product_id } }
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
        category
    ) => {
        try {
            await Auction_product.create({
                user_id: user_id,
                product_name: product_name,
                product_content: product_content,
                product_start_price: product_start_price,
                product_buy_now_price: product_buy_now_price,
                product_update_price: product_start_price,
                product_start: product_start,
                product_end: product_end,
                category: category,
            });
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
        category
    ) => {
        try {
            await General_product.update(
                {
                    user_id: user_id,
                    product_name: product_name,
                    product_content: product_content,
                    product_start_price: product_start_price,
                    product_buy_now_price: product_buy_now_price,
                    product_update_price: product_start_price,
                    product_start: product_start,
                    product_end: product_end,
                    category: category,
                },
                { where: { auction_product_id: auction_product_id } }
            );
        } catch (error) {
            throw error;
        }
    };
    findMyProduct = async (user_id) => {
        try {
            const data1 = await General_product.findAll({
                where: { user_id: user_id },
            });
            const data2 = await Auction_product.findAll({
                where: { user_id: user_id },
            });
            const result = { data1, data2 };
            return result;
        } catch (error) {
            throw error;
        }
    };
    generalProductFind = async (general_product_id) => {
        try {
            const data = await General_product.findOne({
                where: { general_product_id },
                include: [
                    {
                        model: Review,
                        attributes: ['user_id', 'content', 'createdAt'],
                        include: [
                            {
                                model: User,
                                attributes: ['email'],
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: ['email'],
                    },
                ],
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductCart = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        try {
            const data = await Cart.create({
                user_id,
                general_product_id,
                product_quantity,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductreport = async ({
        user_id,
        general_product_id,
        title,
        content,
    }) => {
        try {
            const data = await Report.create({
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

    auctionProductFind = async (auction_product_id) => {
        try {
            const data = await Auction_product.findOne({
                where: { auction_product_id },
                include: [
                    {
                        model: User,
                        attributes: ['email', 'raiting'],
                    },
                ],
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    auctionProductReport = async ({
        user_id,
        auction_product_id,
        title,
        content,
    }) => {
        try {
            const data = await Report.create({
                user_id,
                auction_product_id,
                title,
                content,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    auctionProductPriceUpdate = async ({
        bidder_id,
        auction_product_id,
        product_update_price,
    }) => {
        try {
            const data = await Auction_product.update(
                { bidder_id, product_update_price },
                { where: { auction_product_id } }
            );

            return data;
        } catch (error) {
            throw error;
        }
    };

    auctionProductPurchase = async (auction_product_id, user_id) => {
        try {
            const data1 = await Auction_product.findOne({
                where: { auction_product_id },
            });
            const data2 = await User.findOne({ where: { user_id } });

            const data = [data1, data2];
            return data;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = ProductRepositoty;
