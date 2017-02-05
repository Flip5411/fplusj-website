// server variables
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var db = require('./db.js');

	//email SMTP
var nodemailer = require("nodemailer");
var xoauth2 = require("xoauth2");
var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		xoauth2: xoauth2.createXOAuth2Generator({
			user: "fplusj.2017@gmail.com",
			clientId: "351820011831-3m1lk9finvrb8rdkcna1kqp9ud1i5644.apps.googleusercontent.com",
		    clientSecret: "l4fC5RMfMM694zeRTFZdSA4E",
		    refreshToken: "1/xHEhIQ3zQIJdjmHoMKoDD37x5nkObRVd5wT7Lmm6FXRf5dj-1WBmfB0oBWs-nQKR",
		})
	}
});

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Main route
app.use("/", express.static(__dirname + "/public"));

// grab content from contact form and send email
app.post("/sendemail/", function(req, res) {
	var email = req.body;
	// testing if i got the right info from client
	console.log("Server got: ", email);

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

// Gallery route
app.use('/gallery', express.static(__dirname + "/public/gallery.html"));

// RSVP route
app.use('/RSVP', express.static(__dirname + "/public/rsvp.html"));

// API REQUESTS
//GET /rsvp
app.get("/rsvp/responses", function(req, res) {
	db.rsvp.findAll().then(function (rsvps) {
		console.log("hit db.rsvp.findAll success in GET")
		res.json(rsvps);
	}, function (e) {
		console.log("hit db.rsvp.findAll error in GET")
		res.status(500).send();
	});
});

// POST /rsvp --> receive rsvp info from user
app.post("/rsvp/responses", function(req, res) {
	var rsvp = req.body;

	// testing if i got the right info from client
	console.log("Server got: ", rsvp);

	// store rsvp to database
	db.rsvp.create(rsvp).then(function (rsvp) {
		console.log("hit db.rsvp.create success in POST")
		res.json(rsvp.toJSON());
	}, function (e) {
		console.log("hit db.rsvp.create error in POST")
		res.status(400).send('error');
	});

	// send email as backup
	var mailData = {
		to: "FplusJ2017@gmail.com",
		subject: "New RSVP received: " + rsvp.name.substr(0, rsvp.name.indexOf(' ')),
		text: "RSVP info: " +
			"\n\nName(s): " + rsvp.name +
			"\nAttending: " + rsvp.attending +
			"\nEntree Choice(s): " +
			"\nBeef: " + rsvp.beef +
			"\nFish: " + rsvp.fish +
			"\nPasta: " + rsvp.pasta +
			"\nSong(s): " + rsvp.song
	};
	smtpTransport.sendMail(mailData, function(error, smtpRes) {
		console.log("code in sendMail hit:");
		if (error) {
			console.log("Error trying to send rsvp");
			res.send("error");
		} else {
			console.log("Email sent!");
			res.send(rsvp);
		}
	});
});

// redirects
app.get('/*', function(req, res){
	res.redirect("/");
});

// sync database and run server
db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log("Express server running on: " + PORT + " ...fplusj is up...");
	});
});
