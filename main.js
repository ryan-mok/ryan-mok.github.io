const animateTime = 500;

var currentlyScrolling = false;
var position = 0;
var touchStart;

function scrollDown() {
	if (!currentlyScrolling && position < $('.scroll-to').length - 1) {
		currentlyScrolling = true;
		position++;
		animate(position);
	}
}

function scrollUp() {
	if (!currentlyScrolling && position > 0) {
		currentlyScrolling = true;
		position--;
		animate(position);
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

function getPosition() {
	for (var i = 0; i < $('.scroll-to').length; i++) {
		var element = $('.scroll-to')[i];

		if ($(document).scrollTop() >= $(element).offset().top) {
			position = i;
		}
	}
}

$('body').scrollspy({target: ".navbar", offset: 50});

$("#navbar a").on('click', function (event) {
	if (this.hash !== "") {
		currentlyScrolling = true;

		event.preventDefault();
		var hash = this.hash;

		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, animateTime, function () {
			currentlyScrolling = false;
		});
	}
});

$("#scroll-down").on('click', function (event) {
	if (this.hash !== "") {
		currentlyScrolling = true;

		event.preventDefault();
		var hash = this.hash;

		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, animateTime, function () {
			currentlyScrolling = false;
		});
	}
});


$(document).ready(function () {
	getPosition()

	$(document).bind('wheel', function (e) {
		getPosition()
		if (e.originalEvent.wheelDelta < 0) {
			scrollDown();
		} else {
			scrollUp();
		}
		return false;
	});

	$(document).bind('mousewheel', function (e) {
		getPosition()
		if (e.originalEvent.wheelDelta < 0) {
			scrollDown();
		} else {
			scrollUp();
		}
		return false;
	});

	$(document).bind('DOMMouseScroll', function (e) {
		getPosition()
		if (e.originalEvent.detail > 0) {
			scrollDown();
		} else {
			scrollUp();
		}
		return false;
	});

	$(document).bind('touchstart', function (e) {
		getPosition()
		touchStart = e.originalEvent.touches[0].clientY;
	});

	$(document).bind('touchend', function (e) {
		var touchEnd = e.originalEvent.changedTouches[0].clientY;
		if (touchStart > touchEnd + 5) {
			scrollDown();
		} else if (touchStart < touchEnd - 5) {
			scrollUp();
		}
	});
});