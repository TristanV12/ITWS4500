// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.use(express.static('public'));

//added for twitter API
var TwitterAPI = require('twit');
var Twitter = TwitterAPI({
  consumer_key: 'TCaOuiccF049bY9okramtr2p9',
  consumer_secret: 'Qzb9pHez2U3zYiLuB5AWpRzE6WlutcO2K2zuPkyL0wJvztO6FH',
  access_token: '1068174990-wgmbWXIxcmwsL4RM0ZFjLZ8bcdp6ezRs0bt9Cw1',
  access_token_secret: 'rxplJPs24nn5ItqkSzq28JUHZibMTdnjeNE1G9aiRRdt1'
});

// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// user connected even handler
io.on('connection', function(socket){
  
  // log & brodcast connect event
  console.log('a user connected');
  
  // log disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  // message received event handler
  socket.on('query', function(query){

    //variables
    var count = 0;
    var max = query[1];
    var tracking = query[0];
    var Troy = [ '-73.68', '42.72', '-73.67', '42.73' ];
    if(query[0] != ''){ var stream = Twitter.stream('statuses/filter', {track: query[0]}); }
    else{ var stream = Twitter.stream('statuses/filter', {locations: Troy}); }

    fs.writeFile(__dirname + "/tweets.json", "[", function(err) {if(err) { return console.log(err); } });

    //turns on stream
    var bool = stream.on('tweet', function (tweet) {
      //when we have all of the required tweets, return true for later
      if(max <= count){ return true; }

      //send tweet back to client
      socket.emit('tweet', tweet);

      //increment count
      ++count;

      //for outputting to file, see if we need a comma between items in the array
      if(count != max){
        fs.appendFile(__dirname + "/tweets.json", JSON.stringify(tweet) + ", ", function(err) {if(err) { return console.log(err); } });
      }else{
        fs.appendFile(__dirname + "/tweets.json", JSON.stringify(tweet) + "]", function(err) {if(err) { return console.log(err); } });
      }
      return false;
    });
     
    stream.on('error', function (err) {
      console.log('Oh no')
    });

    // log query
    console.log('query: ' + query[0]);
    
    //close out this function if we have all required tweets
    if(bool){
      return false;
    }
  });
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});