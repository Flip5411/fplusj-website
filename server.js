var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
console.log("Root directory is: " + __dirname + "/public");

app.listen(PORT, function () {
	console.log("Express server running on: " + PORT +" ...exciting stuff...");
});