var guest = {}; // UNIVERSAL(tm) variable for in-browser testing

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

		var isValid_staticForms;
		var isValid_domesticForms;
		var isValid_internationalForms;

		function validateForm(formArray) {
			for (var i = 0; i < formArray.length; i++) {
				if (formArray[i].checkValidity() === false) {
					return false;
				}
			}
			return true;
		}

		function checkForms() {
			isValid_staticForms = validateForm(staticForms);
			isValid_domesticForms = validateForm(domesticForms);
			isValid_internationalForms = validateForm(internationalForms);
		}
		checkForms();

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
			guest = { // if i remove guest from grobal, need to declare var here
				firstName: document.getElementById("form-firstname").value,
				lastName: document.getElementById("form-lastname").value,
				email: document.getElementById("form-email").value,
				phone: document.getElementById("form-phone").value
			};
			
			if (isDomesticAddress) {
				guest.address = {
					type: "Domestic",
					country: "United States",
					line1: document.getElementById("form-address1").value,
					line2: document.getElementById("form-address2").value,
					city: document.getElementById("form-city").value,
					state: document.getElementById("form-state").value,
					zip: document.getElementById("form-zip").value
				};
				guest.JSON = JSON.stringify(guest);
			} else {
				guest.address = {
					type: "international",
					fullAddress: document.getElementById("form-international-address").value
				};
				guest.JSON = JSON.stringify(guest);
			}
			// success message
			userFeedback.innerHTML = "";
			userFeedback.classList.remove("negative");
			userFeedback.classList.add("positive");
			setTimeout(function() {
				userFeedback.innerHTML = "SUCCESS!! We got your info...now just watch your mail and stay tuned for more info!";
				userFeedback.style.display = "block";
			}, 100); // delay so looks like something changed if user gets same message
			console.log("guest created successfully");
			sendBtn.classList.add("disabled");
			sendBtn.disabled = true;
			return;
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