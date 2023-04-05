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
    console.log('connected');
});

server.listen(port, () => {
    console.log('server started');
});