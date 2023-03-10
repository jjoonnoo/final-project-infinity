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

exports.cart = async (req, res) => {
    res.status(200).render('cart/generalProductCart', {
        title: '장바구니',
    });
};

exports.generalDetail = async (req, res) => {
    res.status(200).render('productDetail/generalProductDetail', {
        title: '일반 상세보기',
    });
};

exports.auctionDetail = async (req, res) => {
    res.status(200).render('productDetail/auctionProductDetail', {
        title: '경매 상세보기',
    });
};

exports.auctionPurchase = async (req, res) => {
    res.status(200).render('purchase/auctionProductPurchase', {
        title: '경매상품',
    });
};
