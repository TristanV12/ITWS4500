// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var weather = require('openweathermap');

app.use(express.static('public'));

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

  socket.on('run', function(){
    var bool = false;
    weather.defaults = {units:'metric', lang:'en', mode:'json'};
    weather.now({id:"5811696", APPID: "44db6a862fba0b067b1930da0d769e98"}, function(err, json){
      if(err){ console.log(err); }
      else{
        console.log(json);
        var temp = Math.round(((json["main"]["temp"] * 9) / 5) - 459.67);
        //insert information
        if(temp < 10){ var sen = "<div style=\"color:blue\">It's freezing.</div>"; }
        else if(temp < 40){ var sen = "<div style=\"color:lightblue\">It's cold.</div>"; }
        else if(temp < 70){ var sen = "<div style=\"color:pink\">It's warm.</div>"; }
        else { var sen = "<div style=\"color:red\">It's hot.</div>"; }
      }
      socket.emit("run", [temp, sen]);
      return true;
    });
    if(bool){ return true; }
  });
});

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});