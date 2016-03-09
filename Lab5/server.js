// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static('public'));

//added for twitter API
var twitterAPI = require('node-tweet-stream');
var twitter = new twitterAPI({
  consumer_key: 'TCaOuiccF049bY9okramtr2p9',
  consumer_secret: 'Qzb9pHez2U3zYiLuB5AWpRzE6WlutcO2K2zuPkyL0wJvztO6FH',
  token: '1068174990-wgmbWXIxcmwsL4RM0ZFjLZ8bcdp6ezRs0bt9Cw1',
  token_secret: 'rxplJPs24nn5ItqkSzq28JUHZibMTdnjeNE1G9aiRRdt1'
});

//added for twitter API
var twitAPI = require('twitter');
var twit = new twitterAPI({
  consumer_key: 'TCaOuiccF049bY9okramtr2p9',
  consumer_secret: 'Qzb9pHez2U3zYiLuB5AWpRzE6WlutcO2K2zuPkyL0wJvztO6FH',
  access_token: '1068174990-wgmbWXIxcmwsL4RM0ZFjLZ8bcdp6ezRs0bt9Cw1',
  access_token_secret: 'rxplJPs24nn5ItqkSzq28JUHZibMTdnjeNE1G9aiRRdt1'
});

// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// connect to mongodb
var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('mongodb://localhost/mychat');

// mongodb schemas
var chatMessage = new mongoose.Schema({
  username: String,
  message: String
});
var Message = mongoose.model('Message', chatMessage);

// user connected even handler
io.on('connection', function(socket){
  var tracking = "";
  var max = 0;
  var count = 0;
  
  // log & brodcast connect event
  console.log('a user connected');
  
  // log disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //turns on stream
  twitter.on('tweet', function (tweet) {
    ++count;
//    console.log('tweet received', tweet);
    socket.emit('tweet', tweet);
    if(max <= count){
      twitter.untrack(tracking);
      count = 0;
    }
  });
   
  twitter.on('error', function (err) {
    console.log('Oh no')
  });
  
  // message received event handler
  socket.on('query', function(query){
    twit.stream('statuses/filter', {track: 'Trump'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log("tweet.text");
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});

    count = 0;
    max = query[1];
    twitter.untrack(tracking);
    tracking = query[0];

    twitter.track(query[0]);
    // log chat msg
//    console.log('query: ' + query[0]);
    
    // save message to db
    var message = new Message ({
      message : query[0]
    });
    message.save(function (err, saved) {
      if (err) {
	      return console.log('error saving to db');
      }
    })
  });
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});