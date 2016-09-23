window.onload = function() {

	var navHeight = 50;
	var navTrigger = $("#venue").offset().top - navHeight - 1;
	if (window.scrollY >= navTrigger) {
		$("#lg-nav-fixed").css("top", "0px");
		$("#sm-nav-fixed").css("top", "0px");
		$(".logo.fixed").css("top", "0px");
	} else {
		$("#lg-nav-fixed").css("top", "-" + navHeight + "0px");
		$("#sm-nav-fixed").css("top", "-" + navHeight + "0px");
		$(".logo.fixed").css("top", "-" + navHeight + "0px");
	}

	$(document).scroll(function() {
		if (window.scrollY >= navTrigger) {
			$("#lg-nav-fixed").css("top", "0px");
			$("#sm-nav-fixed").css("top", "0px");
			$(".logo.fixed").css("top", "0px");
		} else {
			$("#lg-nav-fixed").css("top", "-" + navHeight + "0px");
			$("#sm-nav-fixed").css("top", "-" + navHeight + "0px");
			$(".logo.fixed").css("top", "-" + navHeight + "0px");
		}
	});

	$("a").click(function() {
		var linkDest = $(this).attr("href");
		var destPosition = $(linkDest).offset();
		$("html, body").animate({
			scrollTop: destPosition.top - navHeight
		}, "slow");
	});

}