var redis = require('redis');
var db = redis.createClient();

module.exports = Entity;

function Entity(entityName, index) {
	this.entityName = entityName;
	if (index) {
		this.index = index;
	}
};

Entity.prototype.save = function(entity, index, callback) {
	if (entity.id) {
		this.update(entity, callback);
	}
	else {
		db.incr(this.entityName + ':ids', function(err, id) {
			if (err) return callback(err);
			entity.id = id;
			this.update(entity, index, callback);
		});
	}
};

Entity.prototype.update = function(entity, index, callback) {
	var id = entity.id;
	db.set(this.entityName + ':id:' + entity[index], id, function(err) {
		if (err) return callback(err);
		db.hmset(this.entityName + ':' + id, entity, function(err) {
			callback(err);
		});
	});
};

Entity.prototype.getByIndex = function(value, callback) {
	this.getId(value, )
};

Entity.prototype.getId = function(value, callback) {
	db.get(this.entityName + ':id:' + entity[index], callback);
};

Entity.prototype.get = function(id, callback) {
	db.hgetall(this.entityName + ':' + id, function(err, entity) {
		if (err) return callback(err);
		callback(null, entity);
	});
};
