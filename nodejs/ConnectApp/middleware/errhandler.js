var env = process.env.NODE_DEV || 'development';

module.exports = function errorHandler(err, req, res, next) {
	res.statusCode = 500;

	switch(env) {
		case 'development':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({name:err.name, message:err.message}));
			break;
		default:
			res.end('Server Internal Error!');
	}
}