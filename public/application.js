var socket = io();

socket.on('on connect', function (message) {
  $('.user-count').append(`<p>Users connected: ${message.userCount}</p>`)
});

socket.on('chat', function (message) {
  $('.messages').append(`<h3 class="message-title">${message.user} => </h3><p>${message.text}</p><br>`)
});


$('.send-mission').on('click', function() {
  socket.send('mission', {
      title: 'Eat lunch',
      text: 'nomnomnomnomnomnom'
    })
})
