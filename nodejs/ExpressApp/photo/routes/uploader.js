var formidable = require('formidable');

module.exports = function upload(req, res, next) {
	if (req.method == 'POST') {
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			if (err) return next(err);
			req.fields = fields;
			req.files = files;
			next();
		});
	}
	else {
		next();
	}
}
