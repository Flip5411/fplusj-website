// function testPOST() {
// 	$.post("sendForm", guest, function(data) {
// 		alert("Client side funtion fired \nFrom server: " + data.name);
// 		console.log(data);
// 	});
// }

window.onload = function () {
	console.log("app.js hit");

	// Global variables
	var formUS_btn = document.getElementById("form-US-btn");
	var formNotUS_btn = document.getElementById("form-notUS-btn");
	var btnValidationIcon = document.getElementById("btn-validation-icon");
	var formUS_address = document.getElementById("US-address");
	var formNotUS_address = document.getElementById("international-address");
	var sendBtn = document.getElementById("send-btn");
	var userFeedback = document.getElementById("user-feedback");

	// dynamic Address form toggles 
	formUS_btn.onclick = function () {
		formUS_btn.classList.add("btn-active");
		formNotUS_btn.classList.remove("btn-active");
		btnValidationIcon.classList.add("valid");
		formUS_address.style.display = "block";
		formNotUS_address.style.display = "none";

	};

	formNotUS_btn.onclick = function () {
		formNotUS_btn.classList.add("btn-active");
		formUS_btn.classList.remove("btn-active");
		btnValidationIcon.classList.add("valid");
		formNotUS_address.style.display = "block";
		formUS_address.style.display = "none";
	};

	// Guest info checking and processing:
	function processGuestInfo() {
		
		// Validation
		var staticForms = document.querySelectorAll(".static-form .form-control"); // Array
		var domesticForms = document.querySelectorAll("#US-address .form-control"); // Array
		var internationalForms = document.querySelectorAll("#international-address .form-control"); // Array
		var isDomesticAddress = document.getElementById("form-US-btn").classList.contains("btn-active"); // Boolean
		var isInternationalAddress = document.getElementById("form-notUS-btn").classList.contains("btn-active"); // Boolean

		function validateForm(formArray) {
			for (var i = 0; i < formArray.length; i++) {
				if (formArray[i].checkValidity() === false) {
					return false;
				}
			}
			return true;
		}

		var isValid_staticForms = validateForm(staticForms);
		var isValid_domesticForms = validateForm(domesticForms);
		var isValid_internationalForms = validateForm(internationalForms);

		// if invalid - tell user
		function throwError() {
			userFeedback.innerHTML = "";
			userFeedback.classList.remove("positive");
			userFeedback.classList.add("negative");
			setTimeout(function() {
				userFeedback.innerHTML = "Uh oh, you didn't fill out all the info we need...it's ok, forms are hard...";
				userFeedback.style.display = "block";
			}, 100); // delay so looks like something changed if user gets same message
			console.log("Could not create guest, invalid info");
		}

		// if valid - handle guest info:
		function createGuest() {
			var guest = { // if i remove guest from grobal, need to declare var here
				firstName: document.getElementById("form-firstname").value,
				lastName: document.getElementById("form-lastname").value,
				email: document.getElementById("form-email").value,
				phone: document.getElementById("form-phone").value
			};
			
			if (isDomesticAddress) {
				guest.country = "United States";
				var line1 = document.getElementById("form-address1").value;
				var line2 = document.getElementById("form-address2").value;
				var	city = document.getElementById("form-city").value;
				var	state = document.getElementById("form-state").value;
				var	zip = document.getElementById("form-zip").value;
				guest.address = line1 + ", " + line2 + "\n" + city  + ", " + state + " " + zip;
				guest.JSON = JSON.stringify(guest);
			} else {
				guest.country = "International";
				guest.address = document.getElementById("form-international-address").value;
				guest.JSON = JSON.stringify(guest);
			}
			// success message
			userFeedback.innerHTML = "";
			userFeedback.classList.remove("negative");
			userFeedback.classList.add("positive");
			userFeedback.style.display = "block";
			userFeedback.innerHTML = "Sending your info, please wait...";

			$.post("sendForm", guest, function(data) {				
				if (data === "error") {
					userFeedback.classList.remove("positive");
					userFeedback.classList.add("negative");
					userFeedback.innerHTML = "Hmmm, something messed up...if you got this message, let us know at <a href='mailto:FplusJ.2017@gmail.com'>FplusJ.2017@gmail.com</a> and try again later.";
					console.log("Got an error back from the server!");
					sendBtn.classList.add("disabled");
					sendBtn.disabled = true;
				} else {
					userFeedback.innerHTML = "SUCCESS!! We got your info, " + data.firstName + "...now just watch your mail and stay tuned for more info!";
					console.log("guest created successfully in the server!");
					sendBtn.classList.add("disabled");
					sendBtn.disabled = true;
				}
			});
		}

		// test logic - decide which func to run
		if (isValid_staticForms && isValid_domesticForms && isDomesticAddress) { // Domestic form is entirely valid
			console.log("Domestic form is valid");
			createGuest();
		} else if (isValid_staticForms && isValid_internationalForms && isInternationalAddress) { // International form is entirely valid
			console.log("International form is valid");
			createGuest();
		} else {
			console.log("form is invalid");
			throwError();
		}
	}

	// Send button event
	sendBtn.onclick = function () {
		userFeedback.innerHTML = "";
		userFeedback.classList.remove("negative");
		userFeedback.classList.remove("positive");
		processGuestInfo();
	}

}