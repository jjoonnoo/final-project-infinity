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
                    {
                        model: Image,
                        attributes: ['image_url'],
                    },
                ],
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    generalProductAddCart = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        const exist_quantity = await Cart.findOne({
            where: { user_id, general_product_id },
            attributes: ['product_quantity'],
        });

        if (exist_quantity !== null) {
            const add_quantity =
                Number(product_quantity) + exist_quantity.product_quantity;

            await Cart.update(
                { product_quantity: add_quantity },
                { where: { user_id, general_product_id } }
            );
        } else if (exist_quantity === null) {
            const data = await Cart.create({
                user_id,
                general_product_id,
                product_quantity,
            });
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

    generalProductFindCart = async (user_id) => {
        try {
            const data = await Cart.findAll({
                where: { user_id },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email', 'phone', 'address'],
                    },
                    {
                        model: General_product,
                        attributes: [
                            'product_name',
                            'product_content',
                            'product_price',
                        ],
                        include: [
                            {
                                model: Image,
                                attributes: ['image_url'],
                            },
                        ],
                    },
                ],
            });

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
        await General_order.create({
            user_id,
        });

        const { general_order_id } = await General_order.findOne({
            where: { user_id },
            attributes: ['general_order_id'],
            order: [['general_order_id', 'desc']],
        });

        for (let i = 0; i < general_product_id.length; i++) {
            await General_order_info.create({
                general_product_id: general_product_id[i],
                general_order_id: general_order_id,
                product_quantity: product_quantity[i],
            });
        }

        for (let i = 0; i < general_product_id.length; i++) {
            await Cart.destroy({
                where: { user_id, general_product_id: general_product_id[i] },
            });
        }
    };

    generalProductChangeQuantity = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        const data = await Cart.update(
            { product_quantity },
            { where: { user_id, general_product_id } }
        );
        return data;
    };

    generalProductDeleteCart = async ({ user_id, general_product_id }) => {
        const data = await Cart.destroy({
            where: { user_id, general_product_id },
        });
        return data;
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
                    {
                        model: Image,
                        attributes: ['image_url'],
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
                include: [
                    {
                        model: Image,
                        attributes: ['image_url'],
                    },
                ],
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
