const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', function (socket) {
  socket.emit('on connect', {userCount: io.engine.clientsCount})

  var interval = setInterval(function () {
    socket.emit('chat', {user: 'turingbot', text: 'I am a banana.'});
  }, 1000);

  socket.on('message', function (channel, message) {
    if(channel === 'mission') {
      console.log(channel + ':', message);
    }
  });

  socket.on('disconnect', function () {
    clearInterval(interval);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
