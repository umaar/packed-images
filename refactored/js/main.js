(function(global) {

	var init = function() {
		var config = {
			selector: '.packed-image'
		};
		global.PackedImages.init(config);
	};

	document.addEventListener("DOMContentLoaded", init, false);

}(window));