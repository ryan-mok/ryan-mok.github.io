$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

function copyEmail() {
	var $email = $(`<input value='${generateEmail()}'/>`);
	$('body').append($email);
	$email.select();
	document.execCommand('copy');
	$email.remove();
	$('#email').attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy email to clipboard').tooltip('_fixTitle');
}

function generateEmail() {
	var one = 'JiMxMDQ7JiMxMDE7JiMxMDg7JiMxMDg7JiMxMTE7'
	var two = 'JiMwNjQ7'
	var three = 'JiMxMTQ7JiMxMjE7JiMwOTc7JiMxMTA7'
	var four = 'JiMxMDk7JiMxMTE7JiMxMDc7'
	var five = 'JiMwNDY7'
	var six = 'JiMwOTk7JiMwOTc7'

	var string = [atob(one), atob(two), atob(three), atob(four), atob(five), atob(six)].join('')

	return string
}