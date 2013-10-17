var Flip = {
  spans: [],
  goal: 0,
  current: 0,
  timeout: 100,
  currentLength: 0,

  ips: 10,  // increment per time segment
  count: 0, // number of increments registered
  lastTimestamp: (new Date).getTime() / this.timeout,

  init: function () {
    for (var i = 10; i > 0; i--) {
      var $span = $('<span class="digit">').hide();
      this.spans.push($span);
      $('#counter').append($span);
      if ((i-1)%3 == 0 && i > 1) {
        $('#counter').append($('<span class="comma">').text(',').hide());
      }
    }
  },

  update: function (number) {
    var now  = (new Date).getTime() / this.timeout;
    var dps  = (number - this.goal) / (now - this.lastTimestamp);

    this.goal = number;

    if (this.count > 0) {
      this.ips = Math.round((this.ips * this.count + dps) / (this.count+1));
    } else {
      this.current = this.goal;
    }

    this.count++;
    this.lastTimestamp = now;

    this.setContent();
  },

  setContent: function () {
    if (this.current + this.ips < this.goal) {
      this.current += this.ips;
      this.populateDiv(this.current);

      setTimeout(function () {
        Flip.setContent();
      }, this.timeout);
    } else {
      this.current = this.goal;
      this.populateDiv(this.current);
    }
  },

  populateDiv: function (val) {
    var split = (val+'').split('');
    if (this.currentLength < split.length) {
      for (var i = 10-split.length; i < this.spans.length; i++) {
        if (!this.spans[i].is(':visible')) {
          var width = this.spans[i].width();

          this.spans[i].addClass('showing').width(0).css({opacity: 0 }).show().animate({
            opacity: 1,
            width: width
          }, 1000, 'linear');

        }
      }
      $.each(this.spans, function (idx, e) {
        if (e.prev().hasClass('comma') && e.prev().prev().hasClass('showing')) {
          e.prev().fadeIn(1000);
        }
      });
    }
    this.currentLength = split.length;

    for (var i = 10-split.length, j = 0; i < 10; i++, j++) {
      Flip.spans[i].text(split[j]);
    }
  }
};
