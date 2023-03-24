const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const redis_client = require('./redis');
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
    console.log('User connected');
    // videochat socket.io
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });
    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });
    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });
    socket.on('ice', (ice, roomName) => {
        socket.to(roomName).emit('ice', ice);
    });
    // 클라이언트로부터 경매 ID를 받아서 해당 경매에 대한 채팅방을 만든다
    socket.on('createChatRoom', ({ auctionId }) => {
        console.log(`Creating chat room for auction ID ${auctionId}`);
        socket.join(auctionId);
        const room = io.sockets.adapter.rooms.get(auctionId);
        const count = room ? room.size : 0;
        io.to(auctionId).emit('roomCount', { count });
    });

    // 클라이언트로부터 메시지를 받아서 해당 채팅방에 메시지를 전송한다
    socket.on('sendMessage', ({ auctionId, message, user_email }) => {
        console.log(`Sending message to auction ID ${auctionId}: ${message}`);
        io.to(auctionId).emit('chatMessage', { message, user_email });
    });
    socket.on('bid', (bid_info) => {
        const product_id = bid_info.auction_product_id;
        const update_price = bid_info.bid_price;
        try {
            redis_client.mGet(
                `bid_count:auction_product:${product_id}`,
                `update_price:auction_product:${product_id}`,
                async (err, values) => {
                    if (err) {
                        console.error(err);
                    }
                    let count = JSON.parse(values[0]);
                    if (count) {
                        await redis_client.incr(
                            `bid_count:auction_product:${product_id}`
                        );
                    }
                    if (values[1]) {
                        await redis_client.set(
                            `update_price:auction_product:${product_id}`,
                            update_price
                        );
                    } else {
                        await redis_client.set(
                            `update_price:auction_product:${product_id}`,
                            update_price
                        );
                    }
                    count++;
                    io.to(product_id).emit('bid', { count, update_price });
                }
            );
        } catch (err) {
            res.status(500).json({ message: '서버에 오류가 발생' });
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(process.env.PORT, '0.0.0.0', function () {
    console.log(`http://localhost:${process.env.PORT}/`);
});
