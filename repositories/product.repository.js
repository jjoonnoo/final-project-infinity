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
    Auction_order,
} = require('../models');

class ProductRepository {
    generalProductRegist = async (
        user_id,
        product_name,
        product_content,
        product_price,
        category,
        img_url
    ) => {
        const data1 = await General_product.create({
            user_id: user_id,
            product_name: product_name,
            product_content: product_content,
            product_price: product_price,
            category: category,
        });
        let data2 = [];
        if (Array.isArray(img_url) && img_url.length > 0) {
            const validImgUrl = img_url.filter((url) => url); // 유효한 URL만 추출
            data2 = await Promise.all(
                validImgUrl.map((url) =>
                    Image.create({
                        image_url: url,
                        general_product_id: data1.general_product_id,
                    })
                )
            );
        }
        const result = { data1, data2 };
        return result;
    };
    getGeneralProduct = async (general_product_id) => {
        const data1 = await General_product.findOne({
            where: { general_product_id: general_product_id },
        });
        const data2 = await Image.findAll({
            where: { general_product_id: general_product_id },
        });
        const result = { data1, data2 };
        return result;
    };
    generalProductModify = async (
        general_product_id,
        product_name,
        product_content,
        product_price,
        category,
        img_url
    ) => {
        const data1 = await General_product.update(
            {
                product_name: product_name,
                product_content: product_content,
                product_price: product_price,
                category: category,
            },
            { where: { general_product_id: general_product_id } }
        );
        await Image.destroy({
            where: { general_product_id: general_product_id },
        });
        let data2 = [];
        if (Array.isArray(img_url) && img_url.length > 0) {
            const validImgUrl = img_url.filter((url) => url); // 유효한 URL만 추출
            data2 = await Promise.all(
                validImgUrl.map((url) =>
                    Image.create({
                        image_url: url,
                        general_product_id: data1.general_product_id,
                    })
                )
            );
        }
        const result = { data1, data2 };
        return result;
    };
    generalProductDelete = async (general_product_id) => {
        const data = await General_product.destroy({
            where: { general_product_id: general_product_id },
        });
        return data;
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
        const data1 = await Auction_product.create({
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
        let data2 = [];
        if (Array.isArray(img_url) && img_url.length > 0) {
            const validImgUrl = img_url.filter((url) => url); // 유효한 URL만 추출
            data2 = await Promise.all(
                validImgUrl.map((url) =>
                    Image.create({
                        image_url: url,
                        auction_product_id: data1.auction_product_id,
                    })
                )
            );
        }
        const result = { data1, data2 };
        return result;
    };
    getAuctionProduct = async (auction_product_id) => {
        const data1 = await Auction_product.findOne({
            where: { auction_product_id: auction_product_id },
        });
        const data2 = await Image.findAll({
            where: { auction_product_id: auction_product_id },
        });
        const result = { data1, data2 };
        return result;
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
        const data1 = await Auction_product.update(
            {
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
        await Image.destroy({
            where: { auction_product_id: auction_product_id },
        });
        let data2 = [];
        if (Array.isArray(img_url) && img_url.length > 0) {
            const validImgUrl = img_url.filter((url) => url); // 유효한 URL만 추출
            data2 = await Promise.all(
                validImgUrl.map((url) =>
                    Image.create({
                        image_url: url,
                        auction_product_id: auction_product_id,
                    })
                )
            );
        }
        const result = { data1, data2 };
        return result;
    };
    auctionProductDelete = async (auction_product_id) => {
        await Auction_product.destroy({
            where: { auction_product_id: auction_product_id },
        });
    };
    findMyProduct = async (user_id) => {
        const data1 = await General_product.findAll({
            where: { user_id: user_id },
        });
        const data2 = await Auction_product.findAll({
            where: { user_id: user_id },
        });
        const result = { data1, data2 };
        return result;
    };
    findReview = async (user_id) => {
        const general_reviews = await General_product.findAll({
            where: { user_id },
            include: [
                {
                    model: Review,
                    include: [
                        {
                            model: User,
                            attributes: ['email'],
                        },
                    ],
                },
                {
                    model: Image,
                },
            ],
            order: [[Review, 'createdAt', 'DESC']],
        });

        const auction_reviews = await Auction_product.findAll({
            where: { user_id },
            include: [
                {
                    model: Review,
                    include: [
                        {
                            model: User,
                            attributes: ['email'],
                        },
                    ],
                },
                {
                    model: Image,
                },
            ],
            order: [[Review, 'createdAt', 'DESC']],
        });
        const my_reviews = await Review.findAll({
            where: { user_id },
            include: [
                {
                    model: Auction_product,
                    include: [{ model: Image }],
                },
                {
                    model: General_product,
                    include: [{ model: Image }],
                },
            ],
        });
        return { general_reviews, auction_reviews, my_reviews };
    };
    generalProductFind = async (general_product_id) => {
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

    generalProductReport = async ({
        user_id,
        general_product_id,
        title,
        content,
    }) => {
        const data = await Report.create({
            user_id,
            general_product_id,
            title,
            content,
        });

        return data;
    };

    generalProductFindCart = async (user_id) => {
        try {
            const data = await Cart.findAll({
                where: { user_id },
                order: [['createdAt', 'desc']],
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
        const data = await Auction_product.findOne({
            where: { auction_product_id: auction_product_id },
            include: [
                {
                    model: User,
                    attributes: ['email', 'rating'],
                },
                {
                    model: Image,
                    attributes: ['image_url'],
                },
            ],
        });

        return data;
    };

    auctionProductReport = async ({
        user_id,
        auction_product_id,
        title,
        content,
    }) => {
        const data = await Report.create({
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
        product_end,
    }) => {
        if (product_end === '') {
            await Auction_product.update(
                { bidder_id },
                { where: { auction_product_id } }
            );

            const order = await Auction_order.findOne({
                where: { auction_product_id },
            });

            if (order === null) {
                await Auction_order.create({
                    user_id: bidder_id,
                    auction_product_id,
                });
            } else {
                await Auction_order.update(
                    { user_id: bidder_id },
                    { where: { auction_product_id } }
                );
            }
        } else {
            await Auction_product.update(
                { bidder_id, product_end },
                { where: { auction_product_id } }
            );
        }
    };

    auctionProductPurchaseNowFind = async (auction_product_id, user_id) => {
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
    };

    auctionProductPurchaseNow = async ({
        user_id,
        auction_product_id,
        product_buy_now_price,
    }) => {
        const now = new Date();
        await Auction_product.update(
            {
                bidder_id: user_id,
                product_update_price: product_buy_now_price,
                product_end: now.toISOString(),
            },
            { where: { auction_product_id } }
        );

        const order = await Auction_order.findOne({
            where: { auction_product_id },
        });

        if (order === null) {
            await Auction_order.create({ user_id, auction_product_id });
        } else {
            await Auction_order.update(
                { user_id },
                { where: { auction_product_id } }
            );
        }
    };

    generalProductReview = async ({
        user_id,
        general_product_id,
        rating,
        content,
    }) => {
        const data = await Review.create({
            user_id,
            general_product_id,
            rating,
            content,
        });

        const reviews = await Review.findAll({ where: { general_product_id } });

        const totalReviews = reviews.length;
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        const averageRating = totalRating / totalReviews;

        await General_product.update(
            { rating: averageRating },
            { where: { general_product_id: general_product_id } }
        );

        return data;
    };

    auctionProductReview = async ({
        user_id,
        auction_product_id,
        rating,
        content,
    }) => {
        const reviewData = await Review.create({
            user_id,
            auction_product_id,
            rating,
            content,
        });

        // 해당 상품을 등록한 유저의 평균 별점 계산
        const auctionProduct = await Auction_product.findOne({
            where: { auction_product_id },
        });

        const user = await User.findOne({
            where: { user_id: auctionProduct.user_id },
        });

        const userReviews = await Review.findAll({
            where: { auction_product_id },
        });

        const userRatings = userReviews.map((review) => review.rating);
        const userRatingSum = userRatings.reduce(
            (prev, curr) => prev + curr,
            0
        );
        const userRatingAvg = userRatingSum / userRatings.length;

        await User.update(
            { rating: userRatingAvg },
            { where: { user_id: user.user_id } }
        );

        return reviewData;
    };
}

module.exports = ProductRepository;
