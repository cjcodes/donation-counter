
var Tracker = {
  update: function (number) {
    if (window.Flip === undefined) {
      $('#counter').text(number);
    } else {
      Flip.update(number);
    }
  },
  toggle: function (paused) {
    if (window.Flip === undefined) {
      if (paused) {
        $('#toggle').val('play');
      } else {
        $('#toggle').val('pause');
      }
    } else {
      Flip.paused = paused;
    }
  }
};
