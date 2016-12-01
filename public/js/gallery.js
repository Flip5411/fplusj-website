$(document).ready(function() {
	
	// MASONRY SETUP
	function masonryInit() {
		$(".grid").imagesLoaded(function() {
			$(".grid").masonry({
				itemSelector: ".grid-item",
				columnWidth: ".grid-sizer",
				percentPosition: true
			});
		});
	}

// ----- FUNCTIONS
	// Image animation
	function fadeInImage() {
		$(".grid-item").each(function() {
			elemBottom = $(this).offset().top + $(this).outerHeight()/2;
			windowBottom = $(window).scrollTop() + $(window).height();
			if (elemBottom < windowBottom) {
				$(this).css({"opacity": "1"});
			}
		});
	}

	function resetImages() {
		$(".grid-item").css({"opacity": "0"});
	}

// ----- EVENTS
	// on page load
	masonryInit();

	// on scroll
	$(document).scroll(function() {
		masonryInit();
		fadeInImage();
	});

	// on window resize
	$(window).resize(function() {
		masonryInit();
		resetImages();
		fadeInImage();
	});

	// display images on section select
	$("#gallery .btn").click(function() {
		var sectionName = $(this).attr("data-section");
		$("#gallery .btn").removeClass("active");
		$(this).addClass("active");
		$("#gallery-photos .grid").hide();
		$("#gallery-photos ." + sectionName).show();
		masonryInit();
		resetImages();
		$("#gallery-photos ." + sectionName + " .grid-item:nth-child(2)").css({"opacity": "1"});
	});

});