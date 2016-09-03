var photoModel = require('../models/photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

//fake data
/**
var photos = [];

photos.push({
	name: 'Node.js Logo',
	url: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
	name: 'Ryan Speaking',
	url: 'http://nodejs.org/images/ryan-speaker.jpg'
});
*/

exports.list = function (req, res) {
	//res.render('photos', { title: 'Photos', photos: photos });
	photoModel.find({}, function(err, photos) {
		if (err) return next(err);
		res.render('photos', {title: 'Photos', photos: photos});
	});
};

exports.form = function (req, res) {
	res.render('photos/upload', { title: 'Photo upload'});
};

exports.submit = function (dir) {
	return function(req, res, next) {
		var img = req.files.photoImage;
		var name = req.fields.photoName || img.name;
		console.log(img.name);
		var path = join(dir, img.name);
		fs.rename(img.path, path, function(err) {
			if (err) return next(err);
			photoModel.create({name: name, path: img.name}, function(err) {
				if (err) return next(err);
				res.redirect('/photos');
			});
		});
	}
};

exports.download = function (dir) {
	return function(req, res, next) {
		var id = req.params.id;
		photoModel.findById(id, function(err, photo){
			if (err) return next(err);
			var path = join(dir, photo.path);
			res.download(path);
		});
	}
}

