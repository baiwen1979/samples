/**
 * module dependencies
 * @private
 */
var connect = require('connect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var static = require('serve-static');
var compress = require('compression');

/**
 * application initialization
 * @private
 */
var app = connect();

app.use(cookieParser('xiner is my dear baby'))
   .use(function(req, res, next) {
   		//console.log(req.cookies);
   		//console.log(req.signedCookies);
   		console.log(req.method + ': ' + req.url);
   		next();
   })
   //.use(bodyParser.urlencoded({extended: true}))
   //.use(bodyParser.json())
   .use(compress())
   .use(static('public'))
   .listen(8080);