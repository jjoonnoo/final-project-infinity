const ProductService = require('../services/product.service');

class ProductController {
    productService = new ProductService();

    generalProductRegist = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const {
                product_name,
                product_content,
                product_price,
                category,
                img_url,
            } = req.body;
            await this.productService.generalProductRegist(
                user_id,
                product_name,
                product_content,
                product_price,
                category,
                img_url
            );
            res.status(201).json({ message: 'succesfully regist' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    getGeneralProduct = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            const data = await this.productService.getGeneralProduct(
                general_product_id
            );
            res.status(200).json({ data });
        } catch (error) {
            res.status(404).json({ message: '오류' });
        }
    };
    generalProductModify = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            // const user_id = res.locals.user.user_id
            const {
                product_name,
                product_content,
                product_price,
                category,
                img_url,
            } = req.body;
            await this.productService.generalProductModify(
                general_product_id,
                product_name,
                product_content,
                product_price,
                category,
                img_url
            );
            res.status(200).json({ message: 'successfully modify' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    generalProductDelete = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            await this.productService.generalProductDelete(general_product_id);
            res.status(200).json({ message: 'successfully delete' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    auctionProductRegist = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const {
                product_name,
                product_content,
                product_start_price,
                product_buy_now_price,
                product_start,
                product_end,
                category,
                img_url,
            } = req.body;
            await this.productService.auctionProductRegist(
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
            res.status(201).json({ message: 'succesfully regist' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    getAuctionProduct = async (req, res) => {
        try {
            const { auction_product_id } = req.params;
            const data = await this.productService.getAuctionProduct(
                auction_product_id
            );
            res.status(200).json({ data });
        } catch (error) {
            res.status(404).json({ message: '오류' });
        }
    };
    auctionProductModify = async (req, res) => {
        try {
            const { auction_product_id } = req.params;
            const {
                product_name,
                product_content,
                product_start_price,
                product_buy_now_price,
                product_start,
                product_end,
                category,
                img_url,
            } = req.body;
            await this.productService.auctionProductModify(
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
            res.status(200).json({ message: 'successfully modify' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    auctionProductDelete = async (req, res) => {
        try {
            const { auction_product_id } = req.params;
            await this.productService.auctionProductDelete(auction_product_id);
            res.status(200).json({ message: 'successfully delete' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    findMyProduct = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const data = await this.productService.findMyProduct(user_id);
            res.status(200).json({ data });
        } catch (error) {
            res.status(404).json({ message: '오류' });
        }
    };

    generalProductFind = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            const data = await this.productService.generalProductFind(
                general_product_id
            );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    generalProductAddCart = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const { general_product_id } = req.params;
            const { product_quantity } = req.body;

            const data = await this.productService.generalProductAddCart({
                user_id,
                general_product_id,
                product_quantity,
            });

            res.status(201).json({ message: '장바구니에 담았습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    generalProductReport = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const { general_product_id } = req.params;
            const { title, content } = req.body;

            const data = await this.productService.generalProductReport({
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

    generalProductFindCart = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const data = await this.productService.generalProductFindCart(
                user_id
            );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    generalProductPurchase = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const { general_product_id } = req.body;
            const { product_quantity } = req.body;

            const data = await this.productService.generalProductPurchase({
                user_id,
                general_product_id,
                product_quantity,
            });

            res.status(201).json({ message: '구입이 완료되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    generalProductChangeQuantity = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const { general_product_id } = req.body;
            const { product_quantity } = req.body;

            const data = await this.productService.generalProductChangeQuantity(
                {
                    user_id,
                    general_product_id,
                    product_quantity,
                }
            );

            res.status(201).json({ message: '수량을 변경했습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    generalProductDeleteCart = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const { general_product_id } = req.body;

            const data = await this.productService.generalProductDeleteCart({
                user_id,
                general_product_id,
            });

            res.status(201).json({ message: '상품을 삭제했습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auctionProductFind = async (req, res) => {
        try {
            const { auction_product_id } = req.params;
            const data = await this.productService.auctionProductFind(
                auction_product_id
            );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auctionProductReport = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const { auction_product_id } = req.params;
            const { title, content } = req.body;

            const data = await this.productService.auctionProductReport({
                user_id,
                auction_product_id,
                title,
                content,
            });

            res.status(201).json({ message: '신고가 완료되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auctionProductPriceUpdate = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const bidder_id = user_id;
            const { auction_product_id } = req.params;
            const { product_update_price, product_end } = req.body;

            await this.productService.auctionProductPriceUpdate({
                bidder_id,
                auction_product_id,
                product_update_price,
                product_end,
            });

            res.status(201).json({ message: '입찰 등록이 됐습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auctionProductPurchaseNowFind = async (req, res) => {
        // const user_id = res.locals.user.user_id
        const user_id = 98;
        try {
            const { auction_product_id } = req.params;
            const data =
                await this.productService.auctionProductPurchaseNowFind(
                    auction_product_id,
                    user_id
                );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auctionProductPurchaseNow = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 98;
            const { auction_product_id } = req.params;
            const { product_buy_now_price } = req.body;

            await this.productService.auctionProductPurchaseNow({
                user_id,
                auction_product_id,
                product_buy_now_price,
            });

            res.status(201).json({ message: '낙찰이 완료되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = ProductController;
