(function(global) {

	var init = function() {
		global.PackedImages.init({
			selector: '.packed-image'
		});
	}; //init

	document.addEventListener("DOMContentLoaded", init, false);

}(window));