const AuctionProductDetailService = require('../services/auctionProductDetail.service')

class AuctionProductDetailController {
  auctionProductDetailService = new AuctionProductDetailService()

  findOneProduct = async (req, res) => {
    try {
      const { auction_product_id } = req.params
      const data = await this.auctionProductDetailService.findOneProduct(auction_product_id)

      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // purchaseProduct = async (req, res) => {
  //   try{
  //     const { auction_product_id } = req.params
  //     const { product_name, product_price } = req.body

  //   } catch (error) {

  //   }
  // }

  reportProduct = async (req, res) => {
    try {
        // const user_id = res.locals.user.user_id
        const user_id = 98
        const { auction_product_id } = req.params;
        const { title, content } = req.body;
        
        const data = await this.auctionProductDetailService.reportProduct({
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
}

module.exports = AuctionProductDetailController