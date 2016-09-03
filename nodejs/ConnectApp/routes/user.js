module.exports = {
	GET: {
		'/users': function(req, res) {
			res.end('xiaobai, xiner, yuer');
		},
		'/user/:id': function(req, res, id) {
			res.end('user ' + id);
		}
	},
	DELETE: {
		'/user/:id': function(req, res, id) {
			res.end('deleted user ' + id);
		}
	}
};