var express = require('express');
var path = require('path');
var app = express();
var port = 5000;

var message = 'response sent by me (server) and received by client (browser)!';

app.listen(port, function(){
    console.log('server listening at port: ', port);
});

app.use(express.static('public'));          // direct server to public files

app.get('/', function(req, res){
    console.log('request received');
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/saying', function(req, res){              // test get request
    console.log('request received');
    res.send(message);    
});