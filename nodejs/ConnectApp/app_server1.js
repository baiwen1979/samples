//import modules
var connect = require('connect');
//import middleware
var logger = require('./middleware/logger');
var restrict = require('./middleware/restrict');
var router = require('./middleware/router');
var rewrite = require('./middleware/rewrite');
var errorHandler = require('./middleware/errhandler');

var appServer = connect();
//use the middlewares
appServer.use(logger('[:method] :url'));
appServer.use(router(require('./routes/user')));
appServer.use('/admin', restrict({user:'root', password:'1234'}));
appServer.use('/admin', admin);
appServer.use(rewrite);
appServer.use(logger('[:method] :url'));
appServer.use(hello);
appServer.use(errorHandler);
//start the app server on port 8080
appServer.listen(8080, function(){
	console.log("App Server is running on port: 8080 ...");
});

//simple middleware: hello
function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end("Hello, Connect!\n");
}

//simple middleware: admin
function admin(req, res, next) {
	switch(req.url) {
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['admin', 'xiaobai', 'xiner', 'yuer']));
			break;
		default:
			res.statusCode = 404;
			res.end('Not Found!');
	}
}

