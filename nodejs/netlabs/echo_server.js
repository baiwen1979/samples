//import modules
var net = require('net');

var server = net.createServer(function(socket) {
	console.log('Socket Connected.');
	socket.on('data', function(data) {
		console.log('[Event:data] ', data);
	});

	socket.on('end', function() {
		console.log('[Event:end]');
	});

	socket.on('close', function() {
		console.log('[Event:close]');
	});

	socket.pipe(socket); //echo
});

process.on('exit', function(code) {
	console.log('exit(' + code + ')');
});

process.on('uncaughtException', function(err) {
	console.error('UncaughtException: ' + err.message);
	process.exit(1);
});

process.on('SIGINT', function() {
	console.log('Got Ctrl - C!');
	server.close();
});

server.listen(1337, function() {
	if (process.env.DEBUG) {
		console.log('Server is running in DEBUG mode.');
	}
	console.log("listening port: 1337");
});
