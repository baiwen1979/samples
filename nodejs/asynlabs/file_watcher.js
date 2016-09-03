//import models
var events = require('events'),
	util = require('util'),
	fs = require('fs');

//initial variables
var watchDir = './watch', processedDir = './done';

//constructor for Watcher
function Watcher(watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

//inherits from EventEmitter
//Watcher is also a EventEmitter
util.inherits(Watcher, events.EventEmitter); 

//new methods for Watchers
Watcher.prototype.watch = function () {
	var watcher = this; //save the reference to the Watcher Object
	fs.readdir(this.watchDir, function(err, files) {
		if (err) throw err;
		for (var index in files) {
			watcher.emit('process', files[index]);
		}
	});
}

Watcher.prototype.start = function () {
	var watcher = this;
	fs.watchFile(this.watchDir, function(){
		watcher.watch();
	});
}

var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function(file) {
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();
	fs.rename(watchFile, processedFile, function(err){
		if (err) throw err;
	});
});

watcher.start();



