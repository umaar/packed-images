(function(global) {
	var PackedImages = global.PackedImages || {};

	var start = function(config) {
		console.log('Animate called with config: ', config);
	}; //start

	var stop = function() {
		console.log('Animate called with config: ', config);
	}; //stop

	var init = function(config) {
		if (!global.document.querySelectorAll) {
			console.log('No querySelectorAll method found!')
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

		[].forEach.call(elements, function(canvas) {
			console.log(canvas);
			set_animation( "img/{{img}}.png".replace("{{img}}", canvas.dataset.img), window[canvas.dataset.img], canvas.id, 'anim_fallback2');
		});

	}; //init

	PackedImages.animate = animate;
	global.PackedImages = PackedImages;

}(window));






var delay_scale = 0.7;

var animate = function(img, timeline, element)
{
	var i = 0;
	var timer;

	var run_time = 0
	for (var j = 0; j < timeline.length - 1; ++j)
		run_time += timeline[j].delay

	var f = function()
	{
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
}

var animate_fallback = function(img, timeline, element)
{
	var i = 0

	var run_time = 0
	for (var j = 0; j < timeline.length - 1; ++j)
		run_time += timeline[j].delay

	var f = function()
	{
		if (i % timeline.length == 0)
		{
			while (element.hasChildNodes())
				element.removeChild(element.lastChild)
		}

		var frame = i++ % timeline.length
		var delay = timeline[frame].delay * delay_scale
		var blits = timeline[frame].blit

		for (j = 0; j < blits.length; ++j)
		{
			var blit = blits[j]
			var sx = blit[0]
			var sy = blit[1]
			var w = blit[2]
			var h = blit[3]
			var dx = blit[4]
			var dy = blit[5]

			var d = document.createElement('div')
			d.style.position = 'absolute'
			d.style.left = dx + "px"
			d.style.top = dy + "px"
			d.style.width = w + "px"
			d.style.height = h + "px"
			d.style.backgroundImage = "url('" + img.src + "')"
			d.style.backgroundPosition = "-" + sx + "px -" + sy + "px"

			element.appendChild(d)
		}

		timer = window.setTimeout(f, delay)
	}

	if (timer) window.clearTimeout(timer)
	f()
}

function set_animation(img_url, timeline, canvas_id, fallback_id)
{
	var img = new Image()
	img.onload = function()
	{
		var canvas = document.getElementById(canvas_id)
		if (canvas && canvas.getContext)
			animate(img, timeline, canvas)
		// else
		// 	animate_fallback(img, timeline, document.getElementById(fallback_id))
	}
	img.src = img_url;
}