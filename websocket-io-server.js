var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log("A user connected");

    socket.emit('test event', 'here is some data');
});

server.listen(3000, () => {
    console.log("Socket.io server is listenin on port 3000");
})
