//import modules
var http = require('http');
var mysql = require('mysql');

var model = require('timetrack');

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'timetrack_db'
});

var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'POST':
			switch(req.url) {
				case '/':
					model.add(db, req, res);
					break;
				case '/archive':
					model.archive(db, req, res);
					break;
				case '/delete':
					model.delete(db, req, res);
					break;
			}
			break;
		case 'GET':
			switch(req.url) {
				case '/':
					model.show(db, res);
					break;
				case '/archived':
					model.showArchived(db, res);
					break;
			}
			break;
	}
});

var sql = "CREATE TABLE IF NOT EXISTS work ("
        + "id INT(10) NOT NULL AUTO_INCREMENT,"
        + "hours DECIMAL(5,2) DEFAULT 0,"
        + "date DATE,"
        + "archived INT(1) DEFAULT 0,"
        + "description TEXT,"
        + "PRIMARY KEY(id))";

db.query(sql, function(err) {
	if (err) throw err;
	console.log('Database is ready.');
	server.listen(8080, function() {
		console.log('Http Server started on port : 8080');
	});
});