//import modules
var connect = require('connect');

var api = connect();
api.use(users).use(pets).use(errorHandler);

var app = connect();
app.use(hello).use('/api',api).use(errorPage).listen(8080, function(){
	console.log("App Server is running on port : 8080...");
});

function hello(req, res, next) {
	if (req.url.match(/^\/hello/)) {
		res.end("Hello World\n");
	}
	else {
		next();
	}
}

var db = {
	users : [{name: 'xiaobai'}, {name: 'xiner'}, {name: 'yuer'}]
};
function users(req, res, next) {
	var match = req.url.match(/^\/user\/(.+)/);
	if (match) {
		var user = db.users[match[1]];
		if (user) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(user));
		}
		else {
			var err = new Error('User not found!');
			err.notFound = true; //set notFound property
			next(err);
		}
	}
	else {
		next();
	}
}

function pets(req, res, next) {
	if (req.url.match(/^\/pet\/(.+)/)) {
		foo(); //undefined function to raise error!
	}
	else {
		next();
	}
}

function errorHandler(err, req, res, next) {
	console.log(err.stack);
	res.setHeader('Content-Type', 'application/json');
	if (err.notFound) {
		res.statusCode = 404;
		res.end(JSON.stringify({ error: err.message }));
	}
	else {
		res.statusCode = 500;
		res.end(JSON.stringify({ error: 'Internal Server Error'}));
	}
}

function errorPage(err, req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	if (err.notFound) {
		res.statusCode = 404;
		res.end('error: not found');
	}
	else {
		res.statusCode = 500;
		res.end('error: internal server error');
	}
}