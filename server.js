// server variables
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
	//email SMTP
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "fplusj.2017@gmail.com",
		pass: "tresleches1101"
	}
});

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// serve webpage files to app
app.use("/", express.static(__dirname + "/public"));

// grab content from contact form and send email
app.post("/sendEmail", function(req, res) {
	var email = req.body;
	// testing if i got the right info from client
	console.log("Server got: " + email);
	
	var mailData = {
		to: "FplusJ2017@gmail.com",
		replyTo: email.sender,
		subject: email.subject,
		text: "Message from: " + email.name +
			"\n\n" + email.message
	};
	// testing if i created the mailData properly in server
	console.log(
		"to: " + mailData.to +
		"\nreply to: " + mailData.replyTo +
		"\nsubject: " + mailData.subject +
		"\nmessage: " + mailData.text
	);

	smtpTransport.sendMail(mailData, function(error, smtpRes) {
		console.log("code in sendMail hit:");
		if (error) {
			console.log("Error trying to send email");
			res.send("error");
		} else {
			console.log("Email sent!");
			res.send(email);
		}
	});
});

// Redirects
app.get('/*', function(req, res){
  res.redirect("/");
});

// run server from port
app.listen(PORT, function () {
	console.log("Express server running on: " + PORT + " ...fplusj is up...");
});