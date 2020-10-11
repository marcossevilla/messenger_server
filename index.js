const path = require('path');
const express = require('express');

require('dotenv').config();

// db config
const { dbConnection } = require('./database/config');
dbConnection();

// express app
const app = express();

// document read & parsing
app.use(express.json());

// server routes
app.use('/api/login', require('./routes/auth'));

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('server running in port', process.env.PORT);
});


