var ansi = require('ansi');

var cursor = ansi(process.stdout);
var requiredAge = 18;

process.stdout.write('Please enter you age:');
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
	var age = parseInt(data, 10);
	if (isNaN(age)) {
		cursor.fg.red()
		.write(data + ' is not a valid number!',data)
		.fg.reset()
		.write('\n');
		//console.log('%s is not a vaild number!', data);
	}
	else if (age < requiredAge) {
		cursor.fg.yellow()
		.write('You must be at least ' 
			+ requiredAge 
			+ ' to enter, come back in ' 
			+ (requiredAge - age) 
			+ ' years')
		.fg.reset()
		.write('\n');

		/*
		console.log('You must be at least %d to enter, come back in %d years', 
			requiredAge, requiredAge - age);
		*/
	}
	else {
		enterTheSecretDungeon();
	}
	process.stdin.pause();
});

process.stdin.resume();

function enterTheSecretDungeon() {
	cursor.fg.green()
	.write('Welcome to The Program :)')
	.fg.reset()
	.write('\n');
	//console.log('Welcome to The Program :)');
}