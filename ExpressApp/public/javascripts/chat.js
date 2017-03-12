var socket = io();

function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
    socket.emit('chatMessage', from, message);
  }
  $('#m').val('').focus();
  return false;
}

function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}

$(document).ready(function(){
  // On Click on Connect Button Iniitate the User Name and Connect to Server
  $(document).on('click', '#connectToServer' , function() {
    $("#userDiv").hide();
    // Emit Chat message as System when ever the New User Connects.
    socket.emit('chatMessage', 'System', '<b>' + $('#user').val() + '</b> has joined the discussion');

    socket.on('notifyUser', function(user){
      var me = $('#user').val();
      if(user != me) {
        $('#notifyUser').text(user + ' is typing ...');
      }
      setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
    });

    socket.on('chatMessage', function(from, msg){
      var me = $('#user').val();
      var color = (from == me) ? 'green' : '#009afd';
      var from = (from == me) ? 'Me' : from;
      $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
    });
  });
});
