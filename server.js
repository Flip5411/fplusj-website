var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/public"));

// TESTING POST REQUEST
app.post("/sendForm", function(req, res) {
	var guestInfo = req.body;
	console.log("Server got: " + guestInfo.JSON);
	res.send(guestInfo);
});

app.get('/*', function(req, res){
  res.redirect("/");
});

app.listen(PORT, function () {
	console.log("Express server running on: " + PORT +" ...exciting stuff...");
});