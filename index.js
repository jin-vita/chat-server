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

    socket.on('message', (message) => {
        // { from: 'dd', too: 'cc', message: 'aaa' }
        console.log(message);
        const from = message.from;
        const to = message.to;
        console.log('message to : ' + to);
        message.network = 'OK';
        if (clients[from]) {
            clients[from].emit('check', message);
        }
        if (clients[to]) {
            clients[to].emit('message', message);
        }
    });

    socket.on('isRead', (message) => {
        // { from: 'dd', too: 'cc', message: 'aaa' }
        console.log(message);
        const from = message.from;
        console.log('message to : ' + to);
        message.isRead = true;
        if (clients[from]) {
            clients[from].emit('isRead', message);
        }
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log('server started');
});
