var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
//constant
var templateFile = './upform_template.html';

var server = http.createServer(function(req, res) {
	switch(req.method) {
		case 'GET':
			show(res);
			break;
		case 'POST':
			upload(req, res);
			break;
	}
});

function show(res) {
	var html = fs.readFile(templateFile, function(err, data) {
		if (err) {
			notFound(res);
		}
		else {
			var html = data.toString();
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Content-Length', Buffer.byteLength(html));
			res.end(html);
		}
	});
}

function upload(req, res) {
	if (!isFormData(req)) {
		badRequest(res);
		return;
	}
	var form = new formidable.IncomingForm();

	form.on('progress', function(bytesReceived, bytesExpected) {
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
		console.log(percent);
	});
	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files.upfile);
		res.end('Upload Complete!');
	});
}

function isFormData(req) {
	var type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data');
}

function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Not Found!\n');
}

function badRequest(res) {
	res.statusCode = 400;
	res.end('Bad Request!');
}

server.listen(8080, function(){
	console.log("Uploading Server is running on port : 8080 ...");
});