
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.albums);
app.get('/pictures', routes.pictures);
app.get('/albums', routes.albums);
app.get('/pictureviewer', routes.pictureviewer);
app.get('/users', user.list);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = io.listen(server);
//events
io.sockets.on('connection', function (socket) {
	  //socket.emit('news', { hello: 'world' });
	  socket.on('showpicture', function (data) {
	    console.log(data);
	    io.sockets.emit('showpicture', data);
	  });
	});