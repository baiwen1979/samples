var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

var cache = {};

var server = http.createServer(function(request, response) {
	var filePath = null;

	if (request.url == '/') {
		filePath = 'public/index.html';
	}
	else {
		filePath = 'public' + request.url;
	}

	console.log('[info] request url : ' + request.url);

	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

server.listen(8080, function() {
	console.log("server is listening on Port 8080 ...");
});

var chatServer = require("./lib/chat_server");
chatServer.listen(server);

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404 : resource NOT found!');
	response.end();
}

function sendFile(response, filePath, fileContent) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	response.end(fileContent);
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	}
	else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					}
					else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else {
				send404(response);
			}
		});
	}
}


