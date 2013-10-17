
/*
 * GET home page.
 */

module.exports = {
  includes: null,

  init: function (app, includes) {
    this.includes = includes;
    
    var routes = {};

    for (var i in this.routes) {
      routes[this.routes[i]] = require('./' + this.routes[i])(this.includes);
    }

    app.get('/field/:id',  routes.event.get);
    app.post('/field/:id', routes.event.post);
  },

  routes: ['event']
};

