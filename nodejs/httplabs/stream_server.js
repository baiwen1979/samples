var http = require('http'),
	parse = require('url').parse,
	join = require('path').join,
	fs = require('fs');

var w3root = __dirname;

var server = http.createServer(function(req, res){
	var url = parse(req.url);
	var path = join(w3root, url.pathname);
	fs.stat(path, function(err, stat){
		if (err) {
			if ('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end("The requested resource(" + req.url + ") not found!\n");
			}
			else {
				res.statusCode = 500;
				res.end("Internal Server Error!\n");
			}
		}
		else {
			var stream = fs.createReadStream(path);
			stream.on('error', function(err) {
				res.statusCode = 500;
				res.end("Internal Server Error!\n");
			});
			stream.pipe(res);			
		}
	});

});

server.listen(8080, function(){
	console.log("Stream Server is running on port : 8080 ...");
});
