var express = require('express'),
var exphbs = require('express-handlebars'),
var http = require('http'),
var mongoose = require('mongoose'),
var twitter = ('ntwitter'),
var routes = require('./routes'),
var config = require('./config'),
var streamHandler = require('./utils/streamHandler')


//Create express instance and set port 
var app = express();
var port = process.env.PORT || 8080;


//Set handlebars as templating engine
app.engine('handlebar', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Disable etag headers on responses
app.disable('etag');


//Connect mongo db 

//change to process.env.MONGOLAB_URI. when pushing to github 


//Create a new ntwitter instance 
var twit = new twitter(config.twitter)


//Index Route
app.get('/', routes.index);


//Page Route
app.get('/page/:page/:skip', routes.page);


//Set /public as static content dir 
app.use("/", express.static(__dirname + "/public"));


//Start server 
var server = http.createServer(app).listen(port, function(){
	console.log('Express server listening on port' + port);
});


//Initialize socket.io
var io = require('socket.io').listen(server);

//Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter', {track: 'scotch_io, #scotchio'}, function(stream){
	streamHandler(stream,io);
});





