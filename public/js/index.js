$(document).ready(function() {

	// variables
	var navHeight = 50;
	var venuePosition;
	var aboutPosition;
	var navTrigger;

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

	// EVENTS
	// nav click scroll control
	$("#home a").click(function() {
		var linkDest = $(this).attr("href");
		var destPosition = $(linkDest).offset();
		$("html, body").animate({
			scrollTop: destPosition.top - navHeight
		}, 1000);
	});	

	// set nav and backgrounds on load
	toggleNav();
	replaceFixedBg();

	// set nav and backgrounds on scroll
	$(document).scroll(function() {
		toggleNav();
		replaceFixedBg();
	});

	// set background images on screen resize
	$(window).resize(function() {
		replaceFixedBg();
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
});