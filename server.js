var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;

var message = 'here you go!';
var peopleArray = ['samTest', 'georgeTest'];

app.listen(port, function(){
    console.log('server listening at port: ', port);
});

app.use(express.static('public'));          // filters req's to public path
app.use(bodyParser.urlencoded({extended: true}));       // filter that parses req to obj

app.get('/', function(req, res){
    console.log('request received');
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/people', function(req, res){              // test get request response
    console.log('request for people array received. Here ya go!');
    res.send(peopleArray);                                      // send something to client
});

app.post('/addPerson', function(req, res){          // receive data req from client
    //var objTest = req.body.name;                           //.body parses req, stores in var.
    console.log('here is the obj received from client: ' + req.body.name);        // server's log
    res.send(req.body.name);                                  // sends obj to client
})