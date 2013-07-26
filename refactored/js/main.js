(function(global) {

	var init = function() {
		global.PackedImages.init({
			selector: '.packed-image'
		});
	};

	document.addEventListener("DOMContentLoaded", init, false);

}(window));