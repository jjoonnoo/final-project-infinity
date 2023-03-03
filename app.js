const express = require('express')
const app = express()
const { sequelize } = require('./models')

require("dotenv").config();

const product_detail = require('./routes/productDetail.route')


app.use(express.json())

app.use('/product', [product_detail])

app.listen(process.env.PORT, async () => {
  console.log(`${process.env.PORT} 포트가 열렸어요`)
  await sequelize.authenticate()
  console.log('DB authenticate!')
})