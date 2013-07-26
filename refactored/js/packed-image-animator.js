(function(global) {
	var PackedImages = global.PackedImages || {};

	var getPackedImageData = function(img) {
		var data = img.dataset;
		if ( !data || !Object.keys(data).length ) {
			return false;
		}

		return {
			image: img,
			name: data.animName,
			delay: data.delay,
			height: data.height,
			timingData: PackedImages.timingData[data.animName]
		};
	};

	var PackedImage = function(metadata) {
		this.metadata = metadata;

		this.prepare();


	}; //PackedImage

	PackedImage.prototype.prepare = function() {

		this.canvas = document.createElement('canvas');
		this.canvas.width = 600;
		this.canvas.height = this.metadata.height;

		this.metadata.image.parentElement.appendChild(this.canvas);
		this.metadata.image.classList.add('hidden');

		var img = new Image();
		var someFunc = function() {
			var canvas = document.createElement('canvas');
			canvas.id = 'xx11';
			if (canvas.getContext) {
				this.zimage = img;
				this.start();
			}
		}

		img.addEventListener('load', someFunc.bind(this));
		img.src = this.metadata.image.src;
	};

	PackedImage.prototype.start = function() {
		var img = this.zimage;
		var timeline = this.metadata.timingData;
		var element = this.canvas;
		var delay_scale = 0.7;

		var i = 0;
		var timer;

		var run_time = 0
		for (var j = 0; j < timeline.length - 1; ++j) {
			run_time += timeline[j].delay
		}

		var f = function() {

			var frame = i++ % timeline.length
			var delay = timeline[frame].delay * delay_scale
			var blits = timeline[frame].blit

			var ctx = element.getContext('2d')

			for (j = 0; j < blits.length; ++j)
			{
				var blit = blits[j]
				var sx = blit[0]
				var sy = blit[1]
				var w = blit[2]
				var h = blit[3]
				var dx = blit[4]
				var dy = blit[5]
				ctx.drawImage(img, sx, sy, w, h, dx, dy, w, h)
			}
			timer = window.setTimeout(f, delay)
		}

		if (timer) window.clearTimeout(timer)
		f();
	};

	PackedImage.prototype.bindEvents = function() {
		//
	};

	var init = function(config) {
		if (!global.document.querySelectorAll) {
			console.log('No querySelectorAll method found!');
			return;
		}

		if (!config) {
			console.log('No config has been passed');
			return;
		}

		var elements = global.document.querySelectorAll(config.selector);
		if (!elements.length) {
			console.log('No elements matching ' + config.selector + ' were found');
			return;
		}

		[].forEach.call(elements, function(img) {
			var metadata = getPackedImageData(img);

			if (metadata) {
				var pi = new PackedImage(metadata);
				// pi.start();

				// setTimeout(function() {
					//pi.start();
				// }, 30);

			} else {
				console.log('Incomplete metadata found for: ', img);
			}
			//set_animation( "img/{{img}}.png".replace("{{img}}", canvas.dataset.img), window[canvas.dataset.img], canvas.id, 'anim_fallback2');
		});

	}; //init

	PackedImages.init = init;
	global.PackedImages = PackedImages;

}(window));








// var animate_fallback = function(img, timeline, element)
// {
// 	var i = 0

// 	var run_time = 0
// 	for (var j = 0; j < timeline.length - 1; ++j)
// 		run_time += timeline[j].delay

// 	var f = function()
// 	{
// 		if (i % timeline.length == 0)
// 		{
// 			while (element.hasChildNodes())
// 				element.removeChild(element.lastChild)
// 		}

// 		var frame = i++ % timeline.length
// 		var delay = timeline[frame].delay * delay_scale
// 		var blits = timeline[frame].blit

// 		for (j = 0; j < blits.length; ++j)
// 		{
// 			var blit = blits[j]
// 			var sx = blit[0]
// 			var sy = blit[1]
// 			var w = blit[2]
// 			var h = blit[3]
// 			var dx = blit[4]
// 			var dy = blit[5]

// 			var d = document.createElement('div')
// 			d.style.position = 'absolute'
// 			d.style.left = dx + "px"
// 			d.style.top = dy + "px"
// 			d.style.width = w + "px"
// 			d.style.height = h + "px"
// 			d.style.backgroundImage = "url('" + img.src + "')"
// 			d.style.backgroundPosition = "-" + sx + "px -" + sy + "px"

// 			element.appendChild(d)
// 		}

// 		timer = window.setTimeout(f, delay)
// 	}

// 	if (timer) window.clearTimeout(timer)
// 	f()
// }

