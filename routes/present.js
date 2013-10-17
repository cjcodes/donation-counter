
module.exports = function (includes) {
  return {
    get: function(req, res) {
      var id = req.params.id;

      req.models.event.get(id, function (err, event) {
        res.render('present', { title: event.name });
      });
    }
  }
};

