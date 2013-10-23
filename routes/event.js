var nodemailer = require("nodemailer");

module.exports = function (includes) {
  return {
    get: function(req, res) {
      res.render('new_event', { title: 'Create new event' });
    },

    post: function (req, res) {
      var hash = (new Date()).getTime().toString(36);
      req.models.event.create({
        id: hash,
        name: req.body.name,
        count: 0,
        background: req.body.background,
        fontFamily: req.body.fontFamily,
        fontColor: req.body.fontColor,
        flipColor: req.body.flipColor
      }, function (event) {
        var transport = nodemailer.createTransport("SMTP", {
          service: "Gmail",
          auth: {
            user: includes.config.email.user,
            pass: includes.config.email.pass
          }
        });

        var html = includes.app.render('email', {
          title: req.body.name,
          link: 'http://' + req.headers.host + '/event/' + hash
        }, function (err, html) {
          var mailOptions = {
            from: includes.config.email.from,
            to: req.body.email,
            subject: "Your event tracker",
            generateTextFromHTML: true,
            html: html
          }

          transport.sendMail(mailOptions);
        });
        
        res.redirect('/event/'+hash);
      });
    },

    show: function(req, res) {
      req.models.event.get(req.params.id, function (err, event) {
        if (err) {
          res.status(404).send('Not found');
          return;
        }
        res.render('event', {
          title: event.name,
          bodyStyle: 'background: ' + event.background,
          fieldLink: 'http://' + req.headers.host + '/event/' + event.id + '/field',
          presentLink: 'http://' + req.headers.host + '/event/' + event.id + '/present'
        });
      });
    }
  }
};

