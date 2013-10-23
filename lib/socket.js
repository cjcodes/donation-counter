var numeral = require('numeral');

var paused = [];

module.exports = exports = function(server, models) {
  var io = require('socket.io').listen(server, {
    'log level': 0,
    'browser client minification': true
  });

  io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (channel) {
      socket.channel = channel;
      socket.join(channel);
      models.event.get(channel, function (err, event) {
        socket.emit('update', io.formatNumber(event.count));
      });

      if (paused[channel] !== undefined) {
        socket.emit('toggle', paused[channel]);
      } else {
        paused[channel] = false;
      }
    });

    socket.on('toggle', function () {
      paused[socket.channel] = !paused[socket.channel];
      io.sockets.in(socket.channel).emit('toggle', paused[socket.channel]);
    });
  });

  io.formatNumber = function (number) {
    return number;
    //return numeral(number).format('0,0');
  };

  return io;
};
