var redis = require('redis');

var db = redis.createClient();

module.exports = User;

function User(obj) {
	for (var key in obj) {
		this[key] = obj[key];
	}
};

User.prototype.save = function (callback) {
	if (this.id) {
		this.update(callback);
	}
	else
	{
		var user = this;
		db.incr('user:ids', function(err, id) {
			if (err) return callback(err);
			user.id = id;
			user.update(callback);
		});
	}
};

User.prototype.update = function(callback) {
	var user = this;
	var id = user.id;
	db.set('user:id:' + user.name, id, function(err) {
		if (err) return callback(err);
		db.hmset('user:' + id, user, function(err) {
			callback(err);
		});
	});
};

function test() {
	var user = new User({
		name: 'xiner',
		pass: 'pass123',
		age: 2
	});

	user.save(function(err){
		if (err) throw err;
		console.log('user id %d', user.id);
	});
}

test();