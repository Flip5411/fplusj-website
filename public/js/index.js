$(document).ready(function(){

	var navTrigger = $("#venue").offset().top - 50;
	if (window.scrollY >= navTrigger) {
		$("#lg-nav").addClass("fixed");
		$("#sm-nav").addClass("fixed");
		$("#logo").addClass("fixed");
		$("#sm-nav .btn-group").removeClass("dropup");
		$("#sm-nav .btn-group").addClass("dropdown");
	} else {
		$("#lg-nav").removeClass("fixed");
		$("#sm-nav").removeClass("fixed");
		$("#logo").removeClass("fixed");
		$("#sm-nav .btn-group").removeClass("dropdown");
		$("#sm-nav .btn-group").addClass("dropup");
	}


	$(document).scroll(function() {
		if (window.scrollY >= navTrigger) {
			$("#lg-nav").addClass("fixed");
			$("#sm-nav").addClass("fixed");
			$("#logo").addClass("fixed");
			$("#sm-nav .btn-group").removeClass("dropup");
			$("#sm-nav .btn-group").addClass("dropdown");
		} else {
			$("#lg-nav").removeClass("fixed");
			$("#sm-nav").removeClass("fixed");
			$("#logo").removeClass("fixed");
			$("#sm-nav .btn-group").removeClass("dropdown");
			$("#sm-nav .btn-group").addClass("dropup");
		}
	});

	$("a").click(function() {
		var linkDest = $(this).attr("href");
		var destPosition = $(linkDest).offset();
		$("html, body").animate({
			scrollTop: destPosition.top - 50
		}, "slow");
	});

});