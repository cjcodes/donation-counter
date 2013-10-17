
module.exports = exports = function(server, models) {
  var io = require('socket.io').listen(server, {
    'log level': 0,
    'browser client minification': true
  });

  io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (channel) {
      socket.join(channel);
      models.event.get(channel, function (err, event) {
        socket.emit('update', event.count);
      });
    });
  });

  return io;
};
