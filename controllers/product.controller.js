const ProductService = require('../services/product.service');

class ProductController {
    productService = new ProductService();

    generalProductRegist = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 100;
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
    generalProductModify = async (req, res) => {
        try {
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
            const { general_product_id } = req.body;
            await this.productService.generalProductDelete(general_product_id);
            res.status(200).json({ message: 'successfully delete' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    auctionProductRegist = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
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
    auctionProductModify = async (req, res) => {
        try {
            const {
                auction_product_id,
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
            const { auction_product_id } = req.body;
            await this.productService.auctionProductDelete(auction_product_id);
            res.status(200).json({ message: 'successfully delete' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    findMyProduct = async (res) => {
        try {
            // const user_id = res.locals.user.user_id
            const data = this.productService.findMyProduct(user_id);
            res.status(200).json(data);
        } catch (error) {
            res.status(404).json({ message: error.message });
            const data = this.productService.findMyProduct(user_id);
            res.status(200).json(data);
        }
    };

    findOneProduct = async (req, res) => {
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

    generalProductCart = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const { general_product_id } = req.params;
            const { product_quantity } = req.body;

            const data = await this.productService.generalProductCart({
                user_id,
                general_product_id,
                product_quantity,
            });

            res.status(201).json({ message: '장바구니에 담았습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    generalProductreport = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const { general_product_id } = req.params;
            const { title, content } = req.body;

            const data = await this.productService.generalProductreport({
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
            const { product_update_price } = req.body;

            const data = await this.productService.auctionProductPriceUpdate({
                bidder_id,
                auction_product_id,
                product_update_price,
            });

            res.status(201).json({ message: '입찰 등록이 됐습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auctionProductPurchase = async (req, res) => {
        // const user_id = res.locals.user.user_id
        const user_id = 98;
        try {
            const { auction_product_id } = req.params;
            const data = await this.productService.auctionProductPurchase(
                auction_product_id,
                user_id
            );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = ProductController;