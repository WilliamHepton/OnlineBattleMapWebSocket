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

//start websocket
server.listen(3000, () => {
    console.log("Socket.io server is listenin on port 3000");
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:8Fjva5qp@cluster0.irjpv.mongodb.net/OnlineBattleMap?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


io.on('connection', function(socket) {
    console.log("A user connected");
    socket.emit('test event', 'here is some data');

    socket.on('imageUpload', function(battleImage) {
        console.log(battleImage)
        client.connect(function(err, db) {
            if (err) throw err;
            var dbo = db.db("OnlineBattleMap");
            dbo.collection('battleImage').insertOne(battleImage, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
        }); 
    });
});

io.on("deleteimage", (battleImage) => {

});