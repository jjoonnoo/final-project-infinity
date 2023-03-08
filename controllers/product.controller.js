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
        }
    };

    findOneProduct = async (req, res) => {
        try {
            const { general_product_id } = req.params;
            const data = await this.productService.findOneProduct(
                general_product_id
            );

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    productAddCart = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const { general_product_id } = req.params;
            const { product_quantity } = req.body;

            const data = await this.productService.productAddCart({
                user_id,
                general_product_id,
                product_quantity,
            });

            res.status(201).json({ message: '장바구니에 담았습니다.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    reportProduct = async (req, res) => {
        try {
            // const user_id = res.locals.user.user_id
            const user_id = 99;
            const { general_product_id } = req.params;
            const { title, content } = req.body;

            const data = await this.productService.reportProduct({
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
    //   auctionProductService = new AuctionProductService

    //   findOneProduct = async (req, res) => {
    //     try {
    //       const { auction_product_id } = req.params
    //       const data = await this.auctionProductService.findOneProduct({ auction_product_id })

    //       res.status(200).json({ data })
    //     } catch (error) {
    //       res.status(500).json({ message: error.message })
    //     }
    //   }
}

module.exports = ProductController;
