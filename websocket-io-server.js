var app = require('express')();
const cors = require('cors');
app.use(cors());
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on('connection', function(socket) {
    console.log("A user connected");
    socket.emit('test event', 'here is some data');
});

server.listen(3000, () => {
    console.log("Socket.io server is listenin on port 3000");
})
