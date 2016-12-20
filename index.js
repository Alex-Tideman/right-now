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
  io.sockets.emit('on connect', {userCount: io.engine.clientsCount})

  socket.on('message', function (channel, message) {
    if(channel === 'user joined') {
      io.sockets.emit('user joined', message)
    } else {
      io.sockets.emit('chat', message)
    }
  });

  socket.on('disconnect', function (channel, message) {
    io.sockets.emit('user left', {text: 'someone left the chat'})
    io.sockets.emit('on connect', {userCount: io.engine.clientsCount})
  })
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
