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

// API REQUESTS
// POST /sendemail --> grab content from contact form and send email
app.post("/sendemail/", function(req, res) {
	var email = req.body;
	console.log("Server got: ", email); // testing if i got the right info from client

	var mailData = {
		to: "FplusJ2017@gmail.com",
		replyTo: email.sender,
		subject: email.subject,
		text: "Message from: " + email.name +
			"\n\n" + email.message
	};

	smtpTransport.sendMail(mailData, function(error, smtpRes) {
		console.log("sendMail hit for contact form:");
		if (error) {
			console.log("Error trying to send email");
			res.send("error");
		} else {
			console.log("Email sent!");
			res.send(email);
		}
	});
});

//GET /rsvp --> retrieve all stored rsvp info
app.get("/rsvp/responses", function(req, res) {
	db.rsvp.findAll().then(function (rsvps) {
		console.log("hit db.rsvp.findAll success in GET")
		res.json(rsvps);
	}, function (e) {
		console.log("hit db.rsvp.findAll error in GET")
		res.status(500).send();
	});
});

// POST /rsvp --> create a new rsvp record from user
app.post("/rsvp/responses", function(req, res) {
	var rsvp = req.body;

	console.log("Server got: ", rsvp); // testing if i got the right info from client
	// back up email setup
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

	// store rsvp to database, then send it via email
	db.rsvp.create(rsvp)
	.then((rsvp) => {
		console.log("hit db.rsvp.create success in POST")
		smtpTransport.sendMail(mailData, function(error, smtpRes) {
			console.log("sendMail hit for RSVP:");
			if (error) {
				console.log("Error trying to send rsvp email");
				res.status(500).send("error");
			} else {
				console.log("Email sent!");
				res.send(rsvp);
			}
		});
	}, function (e) {
		console.log("hit db.rsvp.create error in POST")
		res.status(500).send('error');
	});
});

// ROUTES
app.use('/gallery', express.static(__dirname + "/public/gallery.html"));
app.use('/RSVP', express.static(__dirname + "/public/rsvp.html"));
// redirects
app.get('/*', function(req, res){
	res.redirect("/");
});

// sync database and run server
db.sequelize.sync({force:true}).then(function () {
	app.listen(PORT, function () {
		console.log("Express server running on: " + PORT + " ...fplusj is up...");
	});
});
