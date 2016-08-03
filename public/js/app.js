window.onload = function () {

	console.log("app.js hit");

	$("#form-US-btn").click(function () {
		$(this).addClass("btn-active");
		$("#form-notUS-btn").removeClass("btn-active");
		$("#international-address").hide();
		$("#US-address").show();
	});

	$("#form-notUS-btn").click(function () {
		$(this).addClass("btn-active");
		$("#form-US-btn").removeClass("btn-active");
		$("#US-address").hide();
		$("#international-address").show();
	});

}