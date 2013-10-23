var bindings = {};

bindings.bind = function () {
  $('#incrementer').keypress(function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      var $this = $(this);
      bindings.post('increment', $this.val(), function () {
        $this.val('');
      });
    }
  });

  $('#updater').keypress(function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      var $this = $(this);
      bindings.post('set', $this.val(), function () {
        $this.val('');
      });
    }
  });

  $('#toggle').click(function () {
    SocketClient.pause();
  });
};

bindings.post = function (type, val, callback) {
  var post = {
    val: val,
    type: type
  };

  $.post(window.location.pathname, post, function (data) {
    if (typeof callback == 'function') {
      callback(val);
    }
  });
};
