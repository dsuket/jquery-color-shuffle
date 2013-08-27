(function($) {

    var defaults = {
    	duration: 3000,
    	colors: ["#ff0000", "#00ff00", "#0000ff"]
    };

    $.fn.colorShuffle = function(settings) {
        var $this = $(this)

        var opts = $.extend({}, defaults, settings);

		var colors = opts.colors.slice();
		var color = colors.shift();
		$this.css("background", color);
		$this = fadeBox($this, colors, opts.duration);

		colors.unshift(color);
		loopFade($this, colors, opts.duration);

        return $this;
    };

	function shuffle(array) {
	    var i = array.length,
	    	array = array.slice();
	    while (i) {
	        var j = Math.floor(Math.random() * i);
	        var t = array[--i];
	        array[i] = array[j];
	        array[j] = t;
	    }
	    return array;
	}

	function changeColor($el, color, duration, callback) {
		return $el.animate({
			backgroundColor: color
		}, duration, callback);
	}

	function fadeBox($el, colors, duration, callback) {
		// console.log("fadeBox", colors);
		var len = colors.length;
		$.each(colors, function(i, color){
			$el = changeColor($el, color, duration, i === (len-1) ? callback : undefined);
		});
		return $el;
	}

	function loopFade($el, colors, duration) {
		colors = shuffle(colors);
		fadeBox($el, colors, duration, function(){
			loopFade($el, colors, duration);
		});
	}

})(jQuery);
