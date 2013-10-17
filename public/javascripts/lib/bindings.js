var bindings = {};

bindings.bind = function () {
  $('#updater').keypress(function (e) {
    var code = e.keyCode || e.which;
    if(code == 13) {
      var $this = $(this);
      $.post(window.location.pathname, {val: $this.val()}, function (data) {
        $this.val('');
      });
    }
  });
};
