// server variables
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
	//email SMTP
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "fplusj.2017@gmail.com",
		pass: "tresleches1101"
	}
});

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

	// serve webpage files to app
app.use("/", express.static(__dirname + "/public"));

// collect and email guest info from Client
app.post("/sendForm", function(req, res) {
	var guest = req.body;
	console.log("Server got: " + guest.JSON);
	
	var mailData = {
		to: "FplusJ2017@gmail.com",
		replyTo: guest.email,
		subject: "New guest info received: " + guest.firstName + " " + guest.lastName,
		text: "Name: " + guest.firstName + " " + guest.lastName +
			"\nEmail: " + guest.email +
			"\nPhone: " + guest.phone +
			"\nAddress:" +
			"\n" + guest.address +
			"\n" + guest.country
	};

	smtpTransport.sendMail(mailData, function(error, smtpRes) {
		console.log("code in sendMail hit:");
		console.log(mailData);
		if (error) {
			console.log("Error trying to send email");
			res.send("error");
		} else {
			console.log("Email sent!");
			res.send(guest);
		}
	});
});

// Redirects
app.get('/*', function(req, res){
  res.redirect("/");
});

// run server from port
app.listen(PORT, function () {
	console.log("Express server running on: " + PORT +" ...exciting stuff...");
});