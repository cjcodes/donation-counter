
module.exports = function (includes) {
  return {
    get: function(req, res) {
      var id = req.params.id;

      req.models.event.get(id, function (err, event) {
        res.render('field', { title: event.name });
      });
    },
    post: function (req, res) {
      var id = req.params.id;

      req.models.event.get(id, function (err, event) {
        event.count += parseInt(req.body.val);
        event.save(function (err) {
          res.send('success');
          includes.io.sockets.in(id).emit('update', includes.io.formatNumber(event.count));
        });
      });
    }
  }
};

