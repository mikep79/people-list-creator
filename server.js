var express = require('express');
var path = require('path');
var app = express();
var port = 5000;

var message = 'here you go!';
var arr = [1,2,3,4,5];

app.listen(port, function(){
    console.log('server listening at port: ', port);
});

app.use(express.static('public'));          // direct server to public files

app.get('/', function(req, res){
    console.log('request received');
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/saying', function(req, res){              // test get request response
    console.log('request received');
    res.send(arr);                                      // send something to client
});