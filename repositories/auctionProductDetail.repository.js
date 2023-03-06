const { Auction_product, User, Report } = require('../models')

class AuctionProductDetailRepository {
  findOneProduct = async (auction_product_id) => {
    try {
      console.log('시작')
      const data = await Auction_product.findOne({ 
        where: { auction_product_id },
        include: [
          {
            model: User,
            attributes: ['email', 'raiting']
          }
        ] 
      })
      
      return data
    } catch (error) {
      throw error
    }
  }

  reportProduct = async ({ user_id, auction_product_id, title, content }) => {
    console.log('저장소 수신완료')
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

}

module.exports = AuctionProductDetailRepository