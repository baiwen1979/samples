var net = require('net');

var EventEmitter = require('events').EventEmitter;
var remoteCmdExecutor = new EventEmitter();

var server = net.createServer(function(socket) {
	socket.on('data', function(data) {
		var echo = '' + data;
		console.log('client:' + echo.trim());
		socket.write('[echo]:' + echo);
		if (echo.charAt(0) == '#') {
			echo = echo.trim();
			if (echo.length > 1) {
				remoteCmdExecutor.emit('command', echo.substring(1, echo.length));
			}
		}
	});
	remoteCmdExecutor.on('command', function(cmd) {
		console.log("executing command: " + cmd + '...');
	});
});

server.listen(8888, function() {
	console.log('Echo Server is running on Port:8888');
});