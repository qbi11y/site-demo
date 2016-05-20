var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var fs      = require('fs');

app.use(express.static('app'));

/*app.get('/', function(req, res){
  res.sendfile('index.html');
});*/

io.on('connection', function(socket){
  console.log('a user connected');
  fs.readdir('app/images', function(err, files) {
    console.log('files in the folder:', files);
    if (files.length > 0) {
        socket.emit('image:init', files)
    }
  });
  fs.watch('app/images', function(event, filename) {
        console.log('event is:' + event);
        if (filename && event != 'change') {
            console.log('filename provided:' +filename);
            socket.emit('image:added', filename);
        } else {
            console.log('filename not provided');
        }
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});