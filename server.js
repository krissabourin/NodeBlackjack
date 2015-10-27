var express = require('express'); // web application framework
var session = require('express-session'); // session middle-ware
var FileStore = require('session-file-store')(session); //provision for storing session data in the session file
var bodyParser = require('body-parser'); //body parsing middleware for json

var app = express(); //create an express.js app
app.use(session({
	  name: 'server-session-cookie-id',
	  secret: 'mySecret',
	  saveUninitialized: true,
	  resave: true,
	  store: new FileStore()
	}));
// name: the name of the session ID cookie set to the response
// secret: used to sign the session ID cookie
// saveUnitialized: force a session that is "uninitialized" to be saved to the store
// resave: forces the session to be saved back to the session store even if the session was never modified during the req.
// store: the session store instance (FileStore)

app.use(bodyParser.urlencoded({ extended: true }));
// .urlencoded: parser only accepts UTF-8 encoding of the body and supports gzip and deflate encodings
// extended = true: bodyparser will contain key-value pairs where the value can be any type
app.use(bodyParser.json());

//define routes and specify which controller
app.use('/api/deal', require('./controllers/api/deal'));
app.use('/api/hit', require('./controllers/api/hit'));
app.use('/api/doubledown', require('./controllers/api/doubledown'));
app.use('/api/stand', require('./controllers/api/stand'));

//start server
var port = process.env.PORT || 8888;
var server = app.listen(port, function () {
	console.log('Blackjack server listening on', port);
});
