
module.exports = function (includes) {
  return {
    get: function(req, res) {
      var id = req.params.id;

      req.models.event.get(id, function (err, event) {
        if (err) {
          res.status(404).send('Not found');
          return;
        }
        res.render('field', { title: event.name });
      });
    },
    post: function (req, res) {
      var id = req.params.id;
      if (isNaN(parseInt(req.body.val))) {
        res.send('fail');
        return;
      }

      req.models.event.get(id, function (err, event) {
        if (req.body.type == 'increment') {
          event.count += parseInt(req.body.val);
        } else {
          event.count = parseInt(req.body.val);
        }

        event.save(function (err) {
          res.send('success');
          includes.io.sockets.in(id).emit('update', includes.io.formatNumber(event.count));
        });
      });
    }
  }
};

