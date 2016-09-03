module.exports = function (options) {
	options = options || {user: 'admin', password:'12345'};
	
	return function restrict(req, res, next) {
		var authorization = req.headers.authorization;
		if (!authorization) return next(new Error('Unauthorized'));

		var parts = authorization.split(' ');
		var scheme = parts[0];
		var auth = new Buffer(parts[1], 'base64').toString().split(':');
		var user = auth[0];
		var password = auth[1];

		authenticateWithDatabase(user, password, function(err) {
			if (err) return next(err);
			next();
		});
	};

	function authenticateWithDatabase(user, password, callback) {
		if (user == options.user && password == options.password) {
			callback();
		}
		else {
			callback(new Error("Invalid Username or Password!"));
		}
	}
}