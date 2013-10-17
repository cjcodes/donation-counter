
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

    app.get('/event/:id/field',   routes.field.get);
    app.post('/event/:id/field',  routes.field.post);

    app.get('/event/:id/present', routes.present.get);
  },

  routes: ['field', 'present']
};

