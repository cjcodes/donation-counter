
module.exports = function (includes) {
  return {
    get: function(req, res) {
      var id = req.params.id;

      req.models.event.get(id, function (err, event) {
        if (err) {
          res.status(404).send('Not found');
          return;
        }
        res.render('present', { title: event.name });
      });
    }
  }
};

