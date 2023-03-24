const express = require('express');
// const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./routes');
require('dotenv').config();
// app.use(helmet.xssFilter());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('layout extraScripts', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static('public'));

// videochat socket.io

io.on("connection", socket => {
    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer)
    })
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    });
});

server.listen(process.env.PORT, '0.0.0.0', function () {
    console.log(`http://localhost:${process.env.PORT}/`);
});
