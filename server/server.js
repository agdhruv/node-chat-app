const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// configure static middleware to serve public folder
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// send message to newly connected user
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// inform all other users that a new user has joined
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

	// custom events start here
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server');
	});
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});