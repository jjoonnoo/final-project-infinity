const express = require('express');
const app = express();
const { sequelize } = require('./models');
// const path = require("path") // 삭제 예정

require('dotenv').config();

app.use(express.json());
app.use('/static', express.static('./static/'));

/* ejs */
// app.use(express.static(path.join(__dirname, "static"))); // 삭제 예정
app.set('view engine', 'ejs');
app.set('views', './static/views');

/* render */
app.get('/product/general/:id', (req, res) => {
    res.render('generalProductDetail');
});

/* router URL */
const product_detail = require('./routes/productDetail.route');

/* router */
app.use('/product', [product_detail]);

app.listen(process.env.PORT, async () => {
    console.log(`${process.env.PORT} 포트가 열렸어요`);
    await sequelize.authenticate();
    console.log('DB authenticate!');
});
