var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;

var peopleArray = [];

app.listen(port, function(){
    console.log('server listening at port: ', port);
});

app.use(express.static('public'));          // filters req's to public path
app.use(bodyParser.urlencoded({extended: true}));       // filter that parses req to obj

app.get('/', function(req, res){
    console.log('base URL hit - serving back index.html');
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/people', function(req, res){              // test get request response
    console.log('request for people array received');       // server's log
    res.send(peopleArray);                                      // send something to client
});

app.post('/addPerson', function(req, res){          // receive data req from client                          
    var personInfo = req.body;                 //.body parses req, stores in var.
    peopleArray.push(personInfo);
    res.send(200);          // test
    console.log('data received from client: ', personInfo);        // server's log
});

app.post('/remove', function (req, res){            // receive data from client
    var indexToRemove = req.body.remove;            // parse obj, store index of person to remove
    console.log('Index of person to remove: ', indexToRemove); 
    peopleArray.splice(indexToRemove-1, 1);             // remove person from peopleArray
    res.send(200);
}); 