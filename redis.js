const redis = require('redis');
const cron = require('node-cron');

const { General_product, Auction_product } = require('./models');
const redis_client = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true,
});
redis_client.on('connect', () => {
    console.info('Redis connected!');
});
redis_client.on('error', (error) => {
    console.error('Redis Client Error', error);
});
redis_client.connect();
const redis_cli = redis_client.v4;
const updateViews = async () => {
    redis_client.keys('views:auction_product:*', async (err, keys) => {
        const auction_products = keys;
        redis_client.mGet(auction_products, async (err, values) => {
            const auction_views = values;
            for (let i = 0; i < auction_products.length; i++) {
                await Auction_product.update(
                    { views: auction_views[i] },
                    {
                        where: {
                            auction_product_id:
                                auction_products[i].split(':')[2],
                        },
                    }
                );
            }
        });
    });
    redis_client.keys('views:general_product:*', async (err, keys) => {
        const general_products = keys;
        redis_client.mGet(general_products, async (err, values) => {
            const general_views = values;
            for (let i = 0; i < general_products.length; i++) {
                await General_product.update(
                    { views: general_views[i] },
                    {
                        where: {
                            general_product_id:
                                general_products[i].split(':')[2],
                        },
                    }
                );
            }
        });
    });
    redis_client.keys('bid_count:auction_product:*', async (err, keys) => {
        const auction_products = keys;
        redis_client.mGet(auction_products, async (err, values) => {
            const auction_count = values;
            for (let i = 0; i < auction_products.length; i++) {
                await Auction_product.update(
                    { bid_count: auction_count[i] },
                    {
                        where: {
                            auction_product_id:
                                auction_products[i].split(':')[2],
                        },
                    }
                );
            }
        });
    });
    redis_client.keys('update_price:auction_product:*', async (err, keys) => {
        const auction_products = keys;
        redis_client.mGet(auction_products, async (err, values) => {
            const auction_price = values;
            for (let i = 0; i < auction_products.length; i++) {
                await Auction_product.update(
                    { product_update_price: auction_price[i] },
                    {
                        where: {
                            auction_product_id:
                                auction_products[i].split(':')[2],
                        },
                    }
                );
            }
        });
    });
};

cron.schedule('*/30 * * * *', () => {
    updateViews();
});
module.exports = redis_client;
