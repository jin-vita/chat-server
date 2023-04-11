const express = require('express');
let http = require('http');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;
let server = http.createServer();
let io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

// middleware
app.use(express.json());
app.use(cors());
const clients = {};
io.on('connection', (socket) => {
    console.log('socket connected');
    console.log(socket.id, 'has joined');

    socket.on('/test', (message) => {
        console.log(message);
    });

    socket.on('sign-in', (id) => {
        console.log(id);
        clients[id] = socket;
        // console.log(clients);
    });

    socket.on("message", (msg) => {
        console.log(msg);
        const targetId = msg.targetId;
        console.log('targetId : ' + msg.targetId);
        if (clients[targetId]) {
            clients[targetId].emit("message", msg);
        }
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log('server started');
});