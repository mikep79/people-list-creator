var express = require('express');
var path = require('path');
var app = express();
var port = 5000;

var message = 'response sent by me (server) and received by client (browser)!';

app.listen(port, function(){
    console.log('server listening at port: ', port);
});

app.get('/', function(req, res){
    console.log('request received');
    res.send(message);    
});