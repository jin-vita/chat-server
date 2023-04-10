const express = require('express');
let http = require('http');
const cors = require('cors');
const app = express();
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
io.on('connection', (socket) => {
    console.log('socket connected');
    console.log(socket.id, 'has joined');
    socket.on('/test', (message) => {
        console.log(message);
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log('server started');
});