var https = require('https'),
	fs = require('fs');

var options = {
	key: fs.readFileSync('./.ssh/key.pem'),
	cert: fs.readFileSync('./.ssh/key-cert.pem')
};

var server = https.createServer(options, function(req, res) {
	res.writeHead(200);
	res.end("Hello, HTTPS\n");
});

server.listen(8080, function() {
	console.log("HTTPS Server is running on port : 8080 ...");
});