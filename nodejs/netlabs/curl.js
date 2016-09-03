var http = require('http');
var url = require('url');

var args = process.argv.slice(2);

args.forEach(function(arg) {
	switch(arg) {
		case '-h':
		case '--help':
			printHelp();
			break;
		default:
			var req = http.get(arg, function(res) {
				res.pipe(process.stdout);
			});
	}
});

function printHelp() {
	console.log('Usage:');
	console.log('\t curl [options] <url>');
	process.exit(0);
}