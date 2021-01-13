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
const client = new MongoClient(uri, 
    { 
       // useNewUrlParser: true, 
        useUnifiedTopology: true,
        //useMongoClient: true,
        //poolSize: 2,
        //promiseLibrary: global.Promise
    }
);


io.on('connection', function(socket) {
    console.log("A user connected");

    socket.on('imageUpload', battleImage => {
        client.connect(function (err, db) {
            if (err)
                throw err;
            var dbo = db.db("OnlineBattleMap");
            dbo.collection('battleImage').insertOne(battleImage);
        });
    });

    socket.on('getImage', imageName => {
        
        client.connect(function (err, db) {
            if (err)
                throw err;
            var dbo = db.db("OnlineBattleMap");
            dbo.collection('battleImage').findOne( {"name": imageName }, function(err, result) {
                if (err) throw (err);
                socket.emit('returnImage', {name: result.name, file: result.file.toString('base64'), category: result.category});
            }); 
        }); 
    });

    socket.on('loadAll', () => {
        
        client.connect(function (err, db) {
            if (err)
                throw err;
            var dbo = db.db("OnlineBattleMap");
            var finalResult = [];
            dbo.collection('battleImage').find().forEach(result => {
                finalResult.push(result);
            }).then(() => {
                socket.emit('returnImages', finalResult);
            });
            
        }); 
    });

    socket.on('saveAll', categories => {
        client.connect(function (err, db) {
            if (err)
                throw err;
            var dbo = db.db("OnlineBattleMap");
            dbo.collection('battleImage').drop();
            categories.forEach(category => {
                category.images.forEach(image => {
                    dbo.collection('battleImage').insertOne(image);
                })
            });
        });
    });
});