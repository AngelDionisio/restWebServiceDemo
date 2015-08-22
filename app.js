var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-Parser');

mongoose.connect('mongodb://localhost/bookAPI');

// stablish connection and provide information if there is a connection error
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
	console.log('Successfully stablished mongodb connection');
});

var Book = require('./models/bookModel');

var app = express();

// Look for the enviroment port variable, if it is not found, set the port to 3000
var port = process.env.PORT || 3000;

// Loading the body parser into app
// This looks into the response's body and see if there is any json, if there is, it adds it to the req.body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/BookRoutes')(Book);


app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);


// handle route root, everytime that route is hit, the callback function is executed
app.get('/', function (req, res) {
	res.send('welcome to my API!');
});

// make the node server listen on given port, and callback function to broadcast app started listening
app.listen(port, function () {
	console.log('Gulp is running app on PORT: ', port);
});