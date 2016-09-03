//import the modules
var http = require('http');
var fs = require('fs');
var queryString = require('querystring');
//to do list
var items = [];
//default template file
var templateFile = './form_template.html';
//create the http server
var server = http.createServer(function(req, res) {
	if ('/' == req.url) {
		switch (req.method) {
			case 'GET':
				show(res);
				break;
			case 'POST':
				add(req, res);
				break;
			default:
				badRequest(res);
		}
	}
	else {
		notFound(res);
	}
});

function show(res) {
	fs.readFile(templateFile, function(err, data){
		if (err) {
			notFound(res);
		}
		else {
			var template = data.toString();
			var itemList = items.map(function(item, i) {
				return '<li>' + item + '</li>';
			}).join('');
			var html = template.replace('@LI', itemList);
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Content-Length', Buffer.byteLength(html));
			res.end(html);
		}
	});
}

function add(req, res) {
	var formData = '';
	req.setEncoding = 'utf8';
	req.on('data', function(chunk){
		formData += chunk;
	});
	req.on('end', function(){
		var item = queryString.parse(formData).item;
		items.push(item);
		show(res);
	});
}

function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Not Found!\n');
}

function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bad Request!\n');
}

server.listen(8080, function(){
	console.log("FORM Server is running on port : 8080 ...");
});
