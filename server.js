// server variables
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// serve webpage files to app
app.use("/", express.static(__dirname + "/public"));

// Redirects
app.get('/*', function(req, res){
  res.redirect("/");
});

// run server from port
app.listen(PORT, function () {
	console.log("Express server running on: " + PORT +" ...fplusj is up...");
});