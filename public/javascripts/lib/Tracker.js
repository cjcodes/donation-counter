
var Tracker = {
  update: function (number) {
    if (window.Flip === undefined) {
      $('#counter').text(number);
    } else {
      Flip.update(number);
    }
  }
};
