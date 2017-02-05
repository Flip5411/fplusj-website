$(document).ready(function() {

    // FORM selectors
    var formName = $('#form-name');
    var formAttending = $('#form-attending');
    var formNotAttending = $('#form-not-attending');
    var formEntreesArea = $('.form-entrees-area');
    var formEntreeInput = $('.entree-input');
    var formBeef = $('#form-beef');
    var formFish = $('#form-fish');
    var formPasta = $('#form-pasta');
    var formSong = $('#form-song');
    var userFeedback = $('#user-feedback');
    var sendBtn = $('#send-btn');

    // RSVP info
    var rsvp = {};
    function getFormValues () {
        rsvp.name = formName.val();
        if (formAttending.html() && !formNotAttending.html()) {
            rsvp.attending = true;
        } else if (!formAttending.html() && formNotAttending.html()) {
            rsvp.attending = false;
        } else {
            rsvp.attending = undefined;
        }
        rsvp.beef = formBeef.val(),
        rsvp.fish = formFish.val(),
        rsvp.pasta = formPasta.val(),
        rsvp.song = formSong.val();
        console.log(rsvp);
    }

    // set form validation
    var formIsValid;
    function validateForm () {
        if (rsvp.attending) {
            if (rsvp.name && (rsvp.beef || rsvp.fish || rsvp.pasta)) {
                return true;
            } else {
                return false;
            }
        } else {
            if (rsvp.name && rsvp.attending !== undefined) {
                return true;
            } else {
                return false;
            }
        }
    }

    // enable/disable button if form is valid/invalid
    function toggleBtn () {
        if (formIsValid) {
            sendBtn.addClass('active');
            userFeedback.html('');
        } else {
            sendBtn.removeClass('active');
            userFeedback.removeClass('positive');
            userFeedback.html("Please fill out all required fields");
        }
    }

    // handle form when user inputs info
    $('.form-control').on('input', function () {
        getFormValues();
        formIsValid = validateForm();
        console.log("form is valid: ",formIsValid);
        toggleBtn();
    });

    // Radio input control
    $('.radio-selector').click(function () {
        // mark/unmark selections
        if (!$(this).html()) {
            $('.radio-selector').empty();
            $(this).html("X");
        } else {
            $(this).empty();
        }

        // validate form
        getFormValues();
        formIsValid = validateForm();
        console.log("form is valid: ",formIsValid);

        // show/hide entree depending on selection
        if (rsvp.attending) {
            formEntreesArea.slideDown('swing');
        } else {
            formEntreesArea.slideUp('swing');
            formEntreeInput.val('');
        }

        toggleBtn();
    });

    // submit form
    sendBtn.click(function() {
        if (!sendBtn.hasClass('active') || sendBtn.hasClass('submitted')) {
            console.log("btn is inactive, did nothing");
        } else {
            userFeedback.addClass('positive');
            userFeedback.html("Submitting RSVP...");

            // send rsvp info to server
            $.post("rsvp/responses", rsvp, function(serverData) {
                if (serverData === "error") {
                    // error message
                    userFeedback.removeClass('positive');
                    userFeedback.html("Hmmm, something messed up...oh well, just email us directly at <a href='mailto:FplusJ.2017@gmail.com'>FplusJ.2017@gmail.com</a>.");
                    console.log("Got an error back from server!");
                } else {
                    // success message
                    userFeedback.addClass('positive');
                    if (serverData.attending === 'true') {
                        userFeedback.html("Thanks, " + serverData.name.substr(0, serverData.name.indexOf(' ')) + ", we're so excited! See you at the wedding :)");
                    } else {
                        userFeedback.html("Awww, too bad you can't make it " + serverData.name.substr(0, serverData.name.indexOf(' ')) + ". That's ok though, let's keep in touch :)");
                    }
                    console.log("Server got the rsvp info!");
                }
            });

            console.log('rsvp: ', rsvp);
            sendBtn.addClass('submitted');
        }
    });

});


// function sendForm () {
//     // validate form
//     function validateForm() {
//         var formArray = $(".form-control");
//         for (var i = 0; i < formArray.length; i++) {
//             if (formArray[i].checkValidity() === false) {
//                 return false;
//             }
//         }
//         return true;
//     }
//     var formIsValid = validateForm();
//
//     // validation success
//     function acceptForm() {
//         // create email object
//         var email = {
//             name: $("#form-name").val(),
//             sender: $("#form-sender").val(),
//             subject: $("#form-subject").val(),
//             message: $("#form-message").val()
//         }
//
//         // tell user sending in progress
//         userFeedback.html("");
//         userFeedback.removeClass("negative");
//         userFeedback.addClass("positive");
//         userFeedback.css("display", "block");
//         userFeedback.html("Sending email, please wait...");
//
//         // send email
//         $.post("sendemail/", email, function(data) {
//             if (data === "error") {
//                 // error message
//                 userFeedback.removeClass("positive");
//                 userFeedback.addClass("negative");
//                 userFeedback.html("Hmmm, something messed up...oh well, just email us directly at <a href='mailto:FplusJ.2017@gmail.com'>FplusJ.2017@gmail.com</a>.");
//                 console.log("Got an error back from server!");
//                 sendBtn.addClass("disabled");
//                 sendBtn.disabled = true;
//             } else {
//                 // success message
//                 userFeedback.html("Thanks, we got your email, " + data.name + "...we'll get back to you ASAP :)");
//                 console.log("Server got the email info!");
//                 sendBtn.addClass("disabled");
//                 sendBtn.disabled = true;
//             }
//         });
//     }
//
//     // validation fail
//     function rejectForm() {
//         userFeedback.html("");
//         userFeedback.removeClass("positive");
//         userFeedback.addClass("negative");
//         setTimeout(function() {
//             userFeedback.html("Uh oh, you didn't fill out the form properly...it's ok, forms are hard...");
//             userFeedback.css("display", "block");
//         }, 100); //this will make it seem like something changed even if you get the same message twice
//         console.log("Invalid form");
//     }
//
//     // run the proper function
//     if (formIsValid) {
//         console.log("Form is valid!");
//         acceptForm();
//     } else {
//         console.log("Form is NOT valid!");
//         rejectForm();
//     }
//
// }
//
// // send email from form
// sendBtn.click(function() {
//     userFeedback.html("");
//     userFeedback.removeClass("negative");
//     userFeedback.removeClass("positive");
//     sendForm();
// });
