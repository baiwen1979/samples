var net = require('net');
if (process.argv.length < 4) {
	console.log("Usage:\n\t netcat <host> <port>\n");
	return 0;
}
var host = process.argv[2];
var port = Number(process.argv[3]);

var socket = net.connect(port, host); 

socket.on('connect', function() {
	process.stdin.pipe(socket);
	socket.pipe(process.stdout);
	process.stdin.resume();
});

socket.on('end', function() {
	process.stdin.pause();
});
