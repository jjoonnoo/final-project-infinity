const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./routes');
const { Auction_product } = require('./models');

require('dotenv').config();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('layout extraScripts', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static('public'));

io.on('connection', (socket) => {
    Auction_product.findAll().then((products) => {
        socket.emit('products', products);
    });
});

server.listen(process.env.PORT, '0.0.0.0', function () {
    console.log(`http://localhost:${process.env.PORT}/`);
});
