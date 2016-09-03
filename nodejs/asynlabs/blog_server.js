var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	getTitles(res);
}).listen(8080, "127.0.0.1", function() { 
	console.log("server is running on port 8080...");
});

function getTitles(res) {
	fs.readFile('./titles.json', function(err, data) {
		if (err) {
			hadError(err, res);
		}
		else {
			getTemplate(JSON.parse(data.toString()), res);
		}
	});
}

function getTemplate(titles, res) {
	fs.readFile('./templates/index.html', function(err, data) {
		if (err) {
			hadError(err, res);
		}
		else {
			formatHtml(titles, data.toString(), res);
		}
	});
}

function formatHtml(titles, template, res) {
	var html = template.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(html);
}

function hadError(err, res) {
	console.error(err);
	res.end('server error!');
}
