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
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 600;
		this.canvas.height = this.metadata.height;
		this.canvas.classList.add('packed-image-canvas');

		this.metadata.image.parentElement.appendChild(this.canvas);
		this.metadata.image.classList.add('hidden');

		this.pauseButton = document.createElement('span');
		this.pauseButton.classList.add('packed-images-icon-pause-circled');
		this.pauseButton.classList.add('animated');
		this.pauseButton.classList.add('bounceIn');
		this.pauseButton.classList.add('packed-images-icon');
		this.metadata.image.parentElement.appendChild(this.pauseButton);

		this.frameIterator = 0;

		var img = new Image();
		var imgOnLoad = function() {
			this.img = img;
			this.start();
			this.bindEvents();
		};

		img.addEventListener('load', imgOnLoad.bind(this));
		img.src = this.metadata.image.src;
	}; //prepare

	PackedImage.prototype.start = function() {
		var img = this.img;
		var timeline = this.metadata.timingData;
		var delayFactor = this.metadata.delay;
		var timer;

		var tick = function() {

			var frame = this.frameIterator++ % timeline.length;
			var delay = timeline[frame].delay * delayFactor;
			var blits = timeline[frame].blit;

			for (j = 0; j < blits.length; ++j) {
				var blit = blits[j];
				var sx = blit[0];
				var sy = blit[1];
				var w = blit[2];
				var h = blit[3];
				var dx = blit[4];
				var dy = blit[5];
				this.ctx.drawImage(img, sx, sy, w, h, dx, dy, w, h);
			}

			if (!this.paused) {
				timer = window.setTimeout(tick.bind(this), delay);
			}
		};

		if (timer) {
			window.clearTimeout(timer);
		}
		var t = tick.bind(this);
		t();
	}; //start

	PackedImage.prototype.bindEvents = function() {
		// var mouseOverCallback = function() {
		// 	this.paused = true;
		// };
		// this.canvas.addEventListener("mouseenter", mouseOverCallback.bind(this));

		// var mouseOutCallback = function() {
		// 	this.paused = false;
		// 	this.start();
		// };
		// this.canvas.addEventListener("mouseout", mouseOutCallback.bind(this));

		var pauseCallback = function() {
			if (this.pauseButton.classList.contains('packed-images-icon-play-circled')) {
				//Play
				this.pauseButton.classList.remove('packed-images-icon-play-circled');
				this.pauseButton.classList.add('packed-images-icon-pause-circled');
				this.paused = false;
				this.start();
			} else {
				//Pause
				this.pauseButton.classList.remove('packed-images-icon-pause-circled');
				this.pauseButton.classList.add('packed-images-icon-play-circled');
				this.paused = true;
			}
		};
		this.pauseButton.addEventListener("click", pauseCallback.bind(this));
	}; //pause

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
			} else {
				console.log('Incomplete metadata found for: ', img);
			}
			//set_animation( "img/{{img}}.png".replace("{{img}}", canvas.dataset.img), window[canvas.dataset.img], canvas.id, 'anim_fallback2');
		});

	}; //init

	PackedImages.init = init;
	global.PackedImages = PackedImages;

}(window));
