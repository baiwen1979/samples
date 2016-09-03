cordova.define("cordova-plugin-hello.Hello", function(require, exports, module) {
var exec = require('cordova/exec');

exports.sayHello = function(arg0, success, error) {
    exec(success, error, "Hello", "sayHello", [arg0]);
};

});
