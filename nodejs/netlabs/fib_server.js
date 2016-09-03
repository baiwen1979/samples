var http = require('http');
var cp = require('child_process');

var server = http.createServer(function(req, res) {
	var child = cp.fork('./fib_calc', [req.url.substring(1)]);
	child.on('message', function(msg) {
		res.end(msg.result + '\n');
	});
});

server.listen(8000);