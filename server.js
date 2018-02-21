const express = require('express')
const app = express();
const bodyParser = require('body-parser')

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    res.setHeader("Content-Type","application/json");
    
    console.log('got request from ' +  req.headers.origin + '. requested url: ' + req.url);
    next();
});

//routes
var books = require('./routes/books');
app.use('/books', books);

app.get('/', function(req, res){
    res.send('hi');
})

app.listen(port, function() {
    console.log('Book store server started at port', port)
})
