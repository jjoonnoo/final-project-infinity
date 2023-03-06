const { General_product, Review, Cart, Report, User } = require('../models');
// const Sequelize = require('sequelize')
// require('dotenv') = process.env
// const sequelize = new Sequelize()

class GeneralProdcutRepositoty {
    findOneProduct = async (general_product_id) => {
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
                ],
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    productAddCart = async ({
        user_id,
        general_product_id,
        product_quantity,
    }) => {
        // const te = await Cart.findAll()
        // console.log(te)

        // if (a) {
        //     console.log('이미 장바구니에 담긴 상품입니다.')
        //     alert('이미 장바구니에 담긴 상품입니다.')
        //     return window.location.reload()
        // }

        try {
            const data = await Cart.create({
                user_id,
                general_product_id,
                product_quantity,
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    reportProduct = async ({ user_id, general_product_id, title, content }) => {
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
}

module.exports = GeneralProdcutRepositoty;
