
/**
 * Requires
 */

var express = require('express');
var orm = require('orm');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var compass = require('node-compass');


/**
 * App config
 */
var app = express();

// set stuff
app.set('port', process.env.PORT || 3000);
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
app.use(orm.express('mysql://root:@localhost/node', {
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
var io = {};
routes.init(app, {io: io});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets = require('./lib/socket')(server, app.models).sockets;
