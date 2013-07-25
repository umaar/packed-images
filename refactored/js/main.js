(function(global) {

	var init = function() {
		var config = {
			foo: 'bar'
		};
		global.PackedImages.animate(config);
	};

	document.addEventListener("DOMContentLoaded", init, false);

}(window));