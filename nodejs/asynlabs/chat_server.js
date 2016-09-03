var net = require('net');
var events = require('events');

var channel = new events.EventEmitter();

channel.clients = {}; //empty object as a map
channel.subscriptions = {};

//add listener for 'join' event
channel.on('join', function(id, client) { 
	this.clients[id] = client;
	console.log('[info]: <' + id + '> has joined the Chat channel!');
	var welcome = '****** Welcome!******\n'
		+ "Guests on line : " + this.listeners('broadcast').length;
	client.write(welcome + "\n");

	this.subscriptions[id] = function (senderId, message) {
		if (id != senderId) {
			this.clients[id].write('[' + senderId + ']: ' + message);
		}
	};
	this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
	this.removeListener('broadcast', this.subscriptions[id]);
	channel.emit('broadcast', 'info', '<' + id + '> has left the Chat channel!\n');
});

channel.on('error', function(err){
	console.log('[error]: ' + err.message);
});

channel.setMaxListeners(20);

var server = net.createServer(function(client) {
	var id = client.remoteAddress + ':' + client.remotePort;
	channel.emit('join', id, client);
	client.on('data', function(data){
		data = data.toString();
		console.log('[' + id + ']: ' + data.trim());
		channel.emit('broadcast', id, data);
	});
	client.on('close', function() {
		console.log('[info]: <' + id + '> has left the Chat channel!');
		channel.emit('leave', id);
	});
});

server.listen(8888, function(){
	console.log("Server is running on port: 8888 ...");
});
