var url = require('url');

module.exports = function rewrite(req, res, next) {
	var path = url.parse(req.url).pathname;

	var match = path.match(/^\/blog\/posts\/(.+)/);
	if (match) {
		findPostIdBySlug(match[1], function(err, id) {
			if (err) return next(err);
			if (!id) return next(new Error('User not found'));
			req.url = '/blog/posts/' + id; //rewrite the url
			next();
		});
	}
	else {
		next();
	}

	function findPostIdBySlug(slug, callback) {
		if (slug == 'A') {
			callback()
		}
		else {
			callback(null, 'post_' + 100);
		}
	}
};
 