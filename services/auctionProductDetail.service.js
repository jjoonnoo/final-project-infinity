const AuctionProductDetailRepository = require('../repositories/auctionProductDetail.repository')

class AuctionProductDetailService {
  auctionProductDetailRepository = new AuctionProductDetailRepository();

  findOneProduct = async (auction_product_id) => {
    try {
      const data = await this.auctionProductDetailRepository.findOneProduct(auction_product_id)

      return data
    } catch (error) {
      throw error
    }
  }

  reportProduct = async ({ user_id, auction_product_id, title, content }) => {
    try {
        console.log('서비스 수신 완료')
        console.log(user_id, auction_product_id, title, content)
        const data = await this.auctionProductDetailRepository.reportProduct({
          user_id,
          auction_product_id,
          title,
          content,
        });
        console.log('서비스 수신  확인')
        
        return data;
    } catch (error) {
        throw error;
    }
};
}

module.exports = AuctionProductDetailService