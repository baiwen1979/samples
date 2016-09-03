var parse = require('url').parse;

module.exports = function route(routeMap) {
	return function (req, res, next) {
		if (!routeMap[req.method]) {
			next();
			return;
		}

		var routes = routeMap[req.method];
		var url = parse(req.url);
		var paths = Object.keys(routes);

		for (var i = 0; i < paths.length; i++) {
			var path = paths[i];
			var fn = routes[path];
			path = path.replace(/\//g, '\\/').replace(/:(\w+)/g, '([^\\/]+)');
			var r = new RegExp('^' + path + '$');
			var captures = url.pathname.match(r);
			if (captures) {
				var args = [req, res].concat(captures.slice(1));
				fn.apply(null, args);
				return;
			}
		}
		
		next();
	};
}