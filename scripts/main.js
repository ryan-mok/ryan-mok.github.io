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

$('body').scrollspy({target: ".navbar", offset: 50});

$("#navbar a").on('click', function (event) {
	if (this.hash !== "") {
		currentlyScrolling = true;

		event.preventDefault();
		var hash = this.hash;

		switch(hash) {
			case "#home": position = 0; break;
			case "#experience": position = 1; break;
			case "#about": position = 2; break;
			case "#contact": position = 3; break;
		}

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
	animate(0)

	$(document).bind('wheel', function (e) {
		if (e.originalEvent.wheelDelta < 0) {
			scrollDown();
		} else {
			scrollUp();
		}
		return false;
	});

	$(document).bind('mousewheel', function (e) {
		if (e.originalEvent.wheelDelta < 0) {
			scrollDown();
		} else {
			scrollUp();
		}
		return false;
	});

	$(document).bind('DOMMouseScroll', function (e) {
		if (e.originalEvent.detail > 0) {
			scrollDown();
		} else {
			scrollUp();
		}
		return false;
	});

	$(document).bind('touchstart', function (e) {
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