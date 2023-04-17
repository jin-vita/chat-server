const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    // origin: "http://localhost:8081"
    origin: '*'
};

const io = require('socket.io')(http.createServer(), {
    cors: corsOptions
});

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
        console.log('message : ' + message);
        const from = message.from;
        const to = message.to;
        console.log('message to : ' + to);
        message.network = 'OK';
        if (!clients[from]) {
            clients[from] = socket;
        }
        clients[from].emit('check', message);

        if (!clients[to]) {
            clients[to] = socket;
        }
        if (from !== to) {
            clients[to].emit('message', message);
        }
    });

    socket.on('isRead', (message) => {
        // { from: 'dd', too: 'cc', message: 'aaa' }
        console.log('isRead : ' + message);
        const from = message.from;
        message.isRead = true;
        if (clients[from]) {
            clients[from].emit('isRead', message);
        }
    });
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: "Welcome to VITALK."});
});

require('./app/routes/vitalk.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
