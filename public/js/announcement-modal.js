$(document).ready(function() {
	var modal_content = 
	'<div id="announcement-modal" class="modal fade" role="dialog">' +
		  	'<div class="modal-dialog">' +
			    '<div class="modal-content">' +
				    '<div class="modal-header">' +
				    	'<h2>Special Announcement!</h2>' +
 				    	'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				    '</div>' +
				    '<div class="modal-body">' +
 				    	'<a href="http://justineflipsout.splashthat.com" target="_blank">' +
	 				    	'<img class="full-flyer" src="img/engagement-party-flyer.jpg">' +
	 				    '</a>' +
				    '</div>' +
			    '</div>' +
		  	'</div>' +
		'</div>' +
	'</div>'
	setTimeout(function() {
		$("#announcement-container").html(modal_content);
		$("#announcement-modal").modal("show");
	}, 5000);
});