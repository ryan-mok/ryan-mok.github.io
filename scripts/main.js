const animateTime = 700;

var currentlyScrolling = false;
var position = 0;
var touchStart;

function scrollDown() {
	if (!currentlyScrolling) {
		currentlyScrolling = true;
		position++;
		if (position > 3) {
			position = 3;
			currentlyScrolling = false;
		} else {
			animate(position);
		}
	}
}

function scrollUp() {
	if (!currentlyScrolling) {
		currentlyScrolling = true;
		position--;
		if (position < 0) {
			position = 0;
			currentlyScrolling = false;
		} else {
			animate(position);
		}
	}
}

function animate(position) {
	var scrollToElement = $('.scroll-to')[position]
	$('html, body').animate({
		scrollTop: $(scrollToElement).offset().top
	}, animateTime, function () {
		currentlyScrolling = false;
	});
}

$('body').scrollspy({target: '.navbar', offset: 50});

$('#navbar a').on('click', function (e) {
	if (this.hash !== '') {
		currentlyScrolling = true;

		e.preventDefault();
		var hash = this.hash;

		switch(hash) {
			case '#home': position = 0; break;
			case '#experience': position = 1; break;
			case '#about': position = 2; break;
			case '#contact': position = 3; break;
		}

		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, animateTime, function () {
			currentlyScrolling = false;
		});
	}
});

$('#scroll-down').on('click', function (e) {
	if (this.hash !== '') {
		currentlyScrolling = true;

		e.preventDefault();
		var hash = this.hash;

		position = 1;

		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, animateTime, function () {
			currentlyScrolling = false;
		});
	}
});

var scrollDebounced = _.debounce(function(e) {
	if (e.wheelDelta < 0) {
		scrollDown();
	} else {
		scrollUp();
	}
}, 50, { leading: true, trailing: false });

$(document).ready(function () {
	$('#experience, #about, #contact').css('display', 'none');

	setTimeout(function() {
		position = 0;
		$('#experience, #about, #contact').css('display', 'block');
	}, 7000)

	document.addEventListener('wheel', function (e) {
		e.preventDefault();
		scrollDebounced(e);
	}, { passive: false });

	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, { passive: false })

	$(document).bind('touchstart', function (e) {
		touchStart = e.touches[0].clientY;
	});

	$(document).bind('touchend', function (e) {
		var touchEnd = e.originalEvent.changedTouches[0].clientY;
		if (touchStart > touchEnd + 5) {
			scrollDown();
		} else if (touchStart < touchEnd - 5) {
			scrollUp();
		}
	});

	$(document).bind('keydown', function(e) {
		var down = { 40: true, 32: true, 33: true, 34: true, 35: true };
		var up = { 38: true, 33: true, 36: true };
		if (down[e.keyCode]) {
			e.preventDefault();
			scrollDown()
		} else if (up[e.keyCode]) {
			e.preventDefault();
			scrollUp()
		}
	});
});
