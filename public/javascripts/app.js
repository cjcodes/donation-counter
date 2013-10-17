requirejs.config({
  baseUrl: '/javascripts/lib',
  paths: {
    app: '../app.js',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
    'socket.io': '/socket.io/socket.io'
  }
});

var scripts = [
  'jquery',
  'socket.io',
  'bindings',
  'Tracker',
  'SocketClient'
];

requirejs(scripts, function () {
  bindings.bind();
  SocketClient.init();
});
