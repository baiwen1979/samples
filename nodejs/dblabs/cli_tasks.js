//import modules
var fs = require('fs'),
	path = require('path');


function main(argv) {
	//get rid of "nodejs cli_task.js", only arguments left
	var args = argv.splice(2); 
	//get the first arguments, the command
	var command = args.shift(); 
	//task description is the left
	var taskDesc = args.join(' ');
	//file to be saved
	var file = path.join(process.cwd(), '/.tasks');

	switch(command) {
		case 'list':
			listTasks(file);
			break;
		case 'add':
			addTask(file, taskDesc);
			break;
		default:
			console.log('Usage: ' + process.argv[0] + ' cli_task' 
				+ ' list | add [task description]');
	}
}

//helper functions
function loadOrInitTasks(file, callback) {
	fs.exists(file, function(exists) {
		if (exists) {
			fs.readFile(file, 'utf8', function(err, data) {
				if (err) throw err;
				var json = data.toString();
				var tasks = JSON.parse(json || '[]');
				callback(tasks);
			});
		}
		else {
			callback([]);
		}
	});
}

function listTasks(file) {
	loadOrInitTasks(file, function(tasks) {
		for (var i in tasks) {
			console.log(i + ') ' + tasks[i]);
		}
	});
}

function storeTasks(file, tasks) {
	fs.writeFile(file, JSON.stringify(tasks), function(err) {
		if (err) throw err;
		console.log('Saved Successfully.');
	}); 
}

function addTask(file, taskDesc) {
	loadOrInitTasks(file, function(tasks) {
		tasks.push(taskDesc);
		storeTasks(file, tasks);
	});
}

main(process.argv);