var http = require('http');

var server = http.createServer(function(req, res) {
	var url = 'http://mail.qq.com';
	var body = '<p>Redirectiing to <a href="' + url + '">' + url + '</a></p>';
	res.setHeader('Location', url);
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.statusCode = 302;
	res.write(body);
	res.end();
});

server.listen(8080, function(){
	console.log("Server is running on port:8080 ...");
});
