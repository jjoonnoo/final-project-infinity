const redis_client = require('../redis');
const { General_product, Auction_product } = require('../models');
exports.homepage = async (req, res) => {
    res.status(200).render('index', {
        title: 'Home',
    });
};
exports.loginandsignup = async (req, res) => {
    res.status(200).render('login', {
        layout: false,
    });
};
exports.myinfo = async (req, res) => {
    res.status(200).render('mypage/myInfo', {
        title: 'My Info',
    });
};
exports.productregist = async (req, res) => {
    res.status(200).render('mypage/productRegist', {
        title: 'Product Regist',
    });
};
exports.myproduct = async (req, res) => {
    res.status(200).render('mypage/myProduct', {
        title: 'My Product',
    });
};

exports.generalproductmodify = async (req, res) => {
    const { general_product_id } = req.params;
    res.status(200).render('mypage/generalProductModify', {
        title: 'Product Modify',
        general_product_id: general_product_id,
    });
};
exports.auctionproductmodify = async (req, res) => {
    const { auction_product_id } = req.params;
    res.status(200).render('mypage/auctionProductModify', {
        title: 'Product Modify',
        auction_product_id: auction_product_id,
    });
};
exports.purchasehistory = async (req, res) => {
    res.status(200).render('mypage/purchaseHistory', {
        title: 'Purchase History',
    });
};
exports.salehistory = async (req, res) => {
    res.status(200).render('mypage/saleHistory', {
        title: 'Sale History',
    });
};
exports.generalcart = async (req, res) => {
    res.status(200).render('cart/generalProductCart', {
        title: '장바구니',
    });
};

exports.generalDetail = async (req, res) => {
    const { general_product_id } = req.params;
    try {
        redis_client.get(
            `views:general_product:${general_product_id}`,
            async (err, cachedViews) => {
                if (err) {
                    console.error(err);
                }
                let views;
                if (cachedViews) {
                    redis_client.incr(
                        `views:general_product:${general_product_id}`
                    );
                    views = JSON.parse(cachedViews);
                } else {
                    const general_product = await General_product.findOne({
                        where: { general_product_id: general_product_id },
                    });
                    views = general_product.views;
                    views++;
                    redis_client.set(
                        `views:general_product:${general_product_id}`,
                        JSON.stringify(views)
                    );
                    redis_client.incr(
                        `views:general_product:${general_product_id}`
                    );
                }
                res.status(200).render('productDetail/generalProductDetail', {
                    title: '일반 상세보기',
                    views,
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: '서버에 오류가 발생' });
    }
};

exports.auctionDetail = async (req, res) => {
    const { auction_product_id } = req.params;
    try {
        redis_client.mGet(
            `views:auction_product:${auction_product_id}`,
            `bid_count:auction_product:${auction_product_id}`,
            `update_price:auction_product:${auction_product_id}`,
            async (err, values) => {
                let views = values[0];
                let count = values[1];
                let price = values[2];
                const auction_product = await Auction_product.findOne({
                    where: { auction_product_id: auction_product_id },
                });
                if (err) {
                    console.error(err);
                }
                if (views) {
                    await redis_client.incr(
                        `views:auction_product:${auction_product_id}`
                    );
                } else {
                    views = auction_product.views;
                    views++;
                    await redis_client.set(
                        `views:auction_product:${auction_product_id}`,
                        JSON.stringify(views)
                    );
                    await redis_client.incr(
                        `views:auction_product:${auction_product_id}`
                    );
                }
                if (!count) {
                    count = auction_product.bid_count;
                    await redis_client.set(
                        `bid_count:auction_product:${auction_product_id}`,
                        JSON.stringify(count)
                    );
                }
                if (!price) {
                    price = auction_product.product_update_price;
                    await redis_client.set(
                        `update_price:auction_product:${auction_product_id}`,
                        JSON.stringify(price)
                    );
                }
                price = Number(price).toLocaleString();
                res.status(200).render('productDetail/auctionProductDetail', {
                    title: '경매 상세보기',
                    views,
                    count,
                    price,
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: '서버에 오류가 발생' });
    }
};

exports.auctionPurchase = async (req, res) => {
    res.status(200).render('purchase/auctionProductPurchase', {
        title: '경매상품',
    });
};

exports.search = async (req, res) => {
    res.status(200).render('search', {
        title: '검색',
    });
};

exports.chatBot = async (req, res) => {
    res.status(200).render('chatbot', {
        title: '상담',
        layout: false,
    });
};

exports.videochat = async (req, res) => {
    res.status(200).render('videochat', {
        title: '화상상담',
        layout: false,
    });
};

exports.admin = async (req, res) => {
    res.status(200).render('admin', {
        title: '관리자',
    });
};
