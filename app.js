
/**
 * Requires
 */

var express = require('express');
var orm = require('orm');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var compass = require('node-compass');
var config = require('./config');


/**
 * App config
 */
var app = express();

// set stuff
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use stuff
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// configure ORM and models
app.models = {};
var db_opts = {
  host: config.db.host,
  database: config.db.db,
  protocol: 'mysql',
  port: '3306',
  user: config.db.user,
  password: config.db.pass
};

app.use(orm.express(db_opts, {
  define: function (db, models, next) {
    app.models.event = models.event = require('./model/event')(db);
    db.sync(next);
  }
}));

// this must come after ORM so ORM can do injection into the req object
app.use(app.router);


/**
 * Development environment
 */
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(compass({
    sass: 'sass',
    logging: true
  }));
}

/**
 * Routing
 */
var includes = {io: {}, config: config};
routes.init(app, includes);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

includes.io = require('./lib/socket')(server, app.models);
