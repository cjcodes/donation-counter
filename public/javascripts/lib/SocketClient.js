var SocketClient = {
  init: function () {
    this.socket = io.connect();
    this.socket.emit('subscribe', window.location.pathname.split('/')[2]);
    this.socket.on('update', function (data) {
      Tracker.update(data);
    });
  },
  send: function (data) {
    this.socket.emit('update', data);
  }
};
