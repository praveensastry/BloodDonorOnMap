var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var brfs = require('brfs');
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var path = require('path');
var resources = path.join(__dirname, '/../dist');
var bowerres = path.join(__dirname, '/../bower_components');
var nmres = path.join(__dirname, '/../node_modules');
var donorService = require('./services/Donor');
var socketIO;

mongoose.connect('mongodb://jotaoncode:jotaoncode@ds035603.mongolab.com:35603/donors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//app.use(express.static(resources));
app.use('/dist', express.static(resources));
app.use('/bower_components',  express.static(bowerres));
app.use('/node_modules',  express.static(nmres));


var allClients = io.on('connection', function(socket){
  socketIO = {
    actualDonors: function (donors) {
      allClients.emit('actual donors', donors);
    },
    setActualDonors: function (donors) {
      socket.emit('actual donors', donors);
    }
  };
  socket.on('newdonor', function (donor) {
    donorService.saveNewDonor(donor).then(function (savedDonor) {
      var editLink = 'http://localhost:3000/user/' + savedDonor._id;
      donorService.updateAll();
      socket.emit('added new donor', savedDonor, editLink);
      allClients.emit('actual donors', donors);
    });
  });
  socket.on("delete donor", function (donorId) {
    donorService.deleteDonor(donorId);
  });
  socket.on("edit donor", function (donor) {
    donorService.editDonor(donor);
  });
  donorService.socket = socketIO;
  donorService.getActualDonors();
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

app.get('/user/:user_id', donorService.templateEdit);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
