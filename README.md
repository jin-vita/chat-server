# chat-server

- - -

# 1

/chat-server> npm init
- - -

# 2

/chat-server> npm install socket.io express nodemon mongoose cors

![image](https://user-images.githubusercontent.com/75659806/230100580-36cc8562-a525-4f40-b779-761d8533c86f.png)
- - -

# 3

"scripts": {
"start": "node index",
"dev": "nodemon index"
}

![image](https://user-images.githubusercontent.com/75659806/230100844-cc8be583-818d-442c-9388-b06f121c9b05.png)
- - -

# 4

create index.js
- - -

# 5

type index.js

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
- - -

# 6

npm run dev

![image](https://user-images.githubusercontent.com/75659806/230102075-3e4eaff7-0fa2-4779-9353-5f0890c31b2b.png)
- - -

# 7

get start to develop!
- - -
