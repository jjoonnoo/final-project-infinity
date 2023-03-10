exports.homepage = async (req, res) => {
    res.status(200).render('index', {
        title: 'Home',
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
// exports.productmodify = async (req, res) => {
//     const {product_id} = req.params
//     res.status(200).render('mypage/productModify', {
//         title: 'Product Modify',
//         id: product_id
//     });
// };
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
