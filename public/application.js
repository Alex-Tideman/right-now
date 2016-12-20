var socket = io();

$(document).ready(() => {
  $('#message-input').hide()
  $('#send-message').hide()
})
socket.on('on connect', function (message) {
  $('#user-count').html(`<p>Users connected: ${message.userCount}</p>`)
});

$('#set-user').on('click', function() {
  const user = $('#user-input').val()
  socket.send('user joined', {
      user: user,
      text: `joined the chat`
    })
    $('#user-input').hide()
    $('#set-user').hide()
    $('#message-input').show()
    $('#send-message').show()
})

$('#send-message').on('click', function() {
  socket.send('chat', {
      user: $('#user-input').val(),
      text: $('#message-input').val()
    })
    $('#message-input').val('')
})

socket.on('chat', function (message) {
  $('.messages').append(`<h3 class="message-title">${message.user} => </h3><p>${message.text}</p><br>`)
});

socket.on('user joined', function (message) {
  $('.messages').append(`<h3 class="user-joined-title">${message.user} ${message.text}</h3><br>`)
});

socket.on('user left', function (message) {
  $('.messages').append(`<h3 class="user-joined-title">${message.text}</h3><br>`)
});
