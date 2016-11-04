$(document).ready(function() {

// ---- VARIABLES ----
	// positions
	var navHeight = 50;
	var venuePosition;
	var aboutPosition;
	var navTrigger;
	var elemBottom;
	var windowBottom;

	// forms
	var userFeedback = $("#user-feedback");
	var sendBtn = $("#send-btn");

// --- FUNCTIONS ----

	// CLOCK COUNTDOWN
	function countdown() {
		var timeDiff;
		var intervalCount = setInterval(function() {
			var now = Date.now();
			var endDate = new Date("May 20 2017 18:30:00 PDT").getTime();
			timeDiff = endDate - now;
			var timeLeft = {
				seconds: Math.floor((timeDiff / 1000) % 60),
				minutes: Math.floor((timeDiff / 1000 / 60) % 60),
				hours: Math.floor((timeDiff / 1000 / 60 / 60) % 24),
				days: Math.floor(timeDiff / 1000 / 60 / 60 / 24)
			}

			$(".countdown .days").html(function() {
				if (timeLeft.days < 10) {
					return ("0" + timeLeft.days).slice(-2);
				} else {
					return timeLeft.days;
				}
			});
			$(".countdown .hours").html(("0" + timeLeft.hours).slice(-2));
			$(".countdown .minutes").html(("0" + timeLeft.minutes).slice(-2));
			$(".countdown .seconds").html(("0" + timeLeft.seconds).slice(-2));
		}, 1000);

		if (timeDiff <= 0) {
			clearInterval(intervalCount);
		}
	}

	// FADE IN PARALLAX EFFECT
	function fadeInContent() {
		// text fade in
		$(".fade-in-text").each(function() {
			elemBottom = $(this).offset().top + $(this).outerHeight() - 75;
			windowBottom = $(window).scrollTop() + $(window).height();
			if (elemBottom < windowBottom) {
				$(this).animate({"opacity": "1", bottom: "0"}, 750, "swing");
			}
		});

		// blocks fade in
		$(".fade-in-block").each(function() {
			elemBottom = $(this).offset().top + $(this).outerHeight()/2 - 75;
			windowBottom = $(window).scrollTop() + $(window).height();
			if (elemBottom < windowBottom) {
				$(this).animate({"opacity": "1", bottom: "0"}, 750, "swing");
			}
		});

		// change fade behavior of certain elements for mobile
		if ($(window).width() < 768) {
			$("#extra .row").removeClass("fade-in-block");
			$(".extra-content-area").addClass("fade-in-block");
		}
	}

	// NAV CONTROL
	function toggleNav() {
		venuePosition = $("#venue").offset().top;
		navTrigger = venuePosition - navHeight - 1;
		if (window.scrollY >= navTrigger) {
			$("#lg-nav-fixed").css("top", "0px");
			$("#sm-nav-fixed").css("top", "0px");
			$(".logo.fixed").css("top", "0px");
		} else {
			$("#lg-nav-fixed").css("top", "-" + navHeight + "px");
			$("#sm-nav-fixed").css("top", "-" + navHeight + "px");
			$(".logo.fixed").css("top", "-" + navHeight + "px");
		}
	}

	// FIXED BACKGROUND CONTROL
		// defining the right pics:
	function programBgPic() {
		if (window.innerWidth > 768) {
			return {
				"background-image": "url(img/family-swings.jpg)",
				"background-position": "center center"
			};
		} else {
			return {
				"background-image": "url(img/family-peer.jpg)",
				"background-position": "left center"
			};
		}
	}

	function extraBgPic() {
		if (window.innerWidth > 768) {
			return {
				"background-image": "url(img/couple-carousel.jpg)",
				"background-position": "left top"
			};
		} else {
			return {
				"background-image": "url(img/couple-skeeball.jpg)",
				"background-position": "-70px 0px"
			};
		}
	}

		// replacing the background pics
	function replaceFixedBg() {
		venuePosition = $("#venue").offset().top;
		aboutPosition = $("#about").offset().top;

		if (window.scrollY >= venuePosition && window.scrollY < aboutPosition) {
			$("#bg-img").css(programBgPic());
		} else if (window.scrollY >= aboutPosition) {
			$("#bg-img").css(extraBgPic());
		} else {
			$("#bg-img").css("background-image", "url(img/marina-resized.jpg)");
		}
	}

	// CONTACT FORM HANDLING
	function sendForm () {
		// validate form
		function validateForm() {
			var formArray = $(".form-control");
			for (var i = 0; i < formArray.length; i++) {
				if (formArray[i].checkValidity() === false) {
					return false;
				}
			}
			return true;
		}
		var formIsValid = validateForm();

		// validation success
		function acceptForm() {
			// create email object
			var email = {
				name: $("#form-name").val(),
				sender: $("#form-sender").val(),
				subject: $("#form-subject").val(),
				message: $("#form-message").val()
			}

			// tell user sending in progress
			userFeedback.html("");
			userFeedback.removeClass("negative");
			userFeedback.addClass("positive");
			userFeedback.css("display", "block");
			userFeedback.html("Sending email, please wait...");

			// send email
			$.post("sendEmail", email, function(data) {
				if (data === "error") {
					// error message
					userFeedback.removeClass("positive");
					userFeedback.addClass("negative");
					userFeedback.html("Hmmm, something messed up...oh well, just email us directly at <a href='mailto:FplusJ.2017@gmail.com'>FplusJ.2017@gmail.com</a>.");
					console.log("Got an error back from server!");
					sendBtn.addClass("disabled");
					sendBtn.disabled = true;
				} else {
					// success message
					userFeedback.html("Thanks, we got your email, " + data.name + "...we'll get back to you ASAP :)");
					console.log("Server got the email info!");
					sendBtn.addClass("disabled");
					sendBtn.disabled = true;
				}
			});
		}

		// validation fail
		function rejectForm() {
			userFeedback.html("");
			userFeedback.removeClass("positive");
			userFeedback.addClass("negative");
			setTimeout(function() { 
				userFeedback.html("Uh oh, you didn't fill out the form properly...it's ok, forms are hard...");
				userFeedback.css("display", "block");
			}, 100); //this will make it seem like something changed even if you get the same message twice
			console.log("Invalid form");
		}

		// run the proper function
		if (formIsValid) {
			console.log("Form is valid!");
			acceptForm();
		} else {
			console.log("Form is invalid!");
			rejectForm();
		}

	}

// ---- EVENTS ---- 
	// nav click scroll control
	$("#home a").click(function() {
		var linkDest = $(this).attr("href");
		var destPosition = $(linkDest).offset();
		$("html, body").animate({
			scrollTop: destPosition.top - navHeight
		}, 1000);
	});	

	// set nav, backgrounds, and fade-ins on load
	toggleNav();
	replaceFixedBg();
	setTimeout(function() {fadeInContent()}, 1000);
	countdown();

	// set nav, backgrounds, and fade-ins on scroll
	$(document).scroll(function() {
		toggleNav();
		replaceFixedBg();
		fadeInContent();
	});

	// set nav, backgrounds, and fade-ins on screen resize
	$(window).resize(function() {
		toggleNav();
		replaceFixedBg();
		fadeInContent();
	});

	// toggle between stat and bio cards
		//justine
	$("#justine-card .show-stats-btn, #justine-card .show-bio-btn").click(function() {
		$("#justine-card .bio").slideToggle();		
		$("#justine-card .stats").slideToggle();
	});
		//felipe
	$("#felipe-card .show-stats-btn, #felipe-card .show-bio-btn").click(function() {
		$("#felipe-card .bio").slideToggle();		
		$("#felipe-card .stats").slideToggle();
	});
		//creamy
	$("#creamy-card .show-stats-btn, #creamy-card .show-bio-btn").click(function() {
		$("#creamy-card .bio").slideToggle();		
		$("#creamy-card .stats").slideToggle();
	});

	// send email from form
	sendBtn.click(function() {
		userFeedback.html("");
		userFeedback.removeClass("negative");
		userFeedback.removeClass("positive");
		sendForm();
	});

});





