(function () {
	"use strict";

	var LEFT_MOUSECLICK_CODE = 1;
	var ENTER_KEY_CODE = 13;
	var queryInput, querySend, resultDiv;

	window.onload = init;

	function init() {
		queryInput = document.getElementById("q");
		querySend = document.getElementById("send");
		resultDiv = document.getElementById("result");

		queryInput.addEventListener("keydown", queryInputKeyDown);
		querySend.addEventListener("click", queryInputKeyDown);
		window.init();
		showWelcomeEvent();
	}

	function queryInputKeyDown(event) {
		var value = queryInput.value;

		if ((event.which !== ENTER_KEY_CODE && event.which !== LEFT_MOUSECLICK_CODE) || value == "") {
			return;
		}

		queryInput.value = "";

		createQueryNode(value);

		sendText(value)
			.then(function (response) {
				var result;
				try {
					result = response.result.fulfillment.speech
				} catch (error) {
					result = "";
				}
				var responseNode = createResponseNode();
				setResponseOnNode(result, responseNode);
				window.scrollTo(0, document.body.scrollHeight);
			})
			.catch(function (err) {
				setResponseOnNode("Something went wrong. Please try again.", responseNode);
			});
	}

	function createQueryNode(query) {
		var node = document.createElement('div');
		node.className = "clearfix right-align right card-panel grey darken-3";
		node.innerHTML = query;
		resultDiv.appendChild(node);
	}

	function createResponseNode() {
		var node = document.createElement('div');
		node.className = "clearfix left-align left card-panel grey darken-4";
		node.innerHTML = "Something went wrong. Please try again.";
		resultDiv.appendChild(node);
		return node;
	}

	function setResponseOnNode(response, node) {
		node.innerHTML = response ? response : "Something went wrong. Please try again.";
		node.setAttribute('data-actual-response', response);
	}

	function showWelcomeEvent(event) {
		welcomeEvent()
			.then(function (response) {
				var result;
				try {
					result = response.result.fulfillment.speech
				} catch (error) {
					result = "";
				}
				var responseNode = createResponseNode();
				setResponseOnNode(result, responseNode);
			})
			.catch(function (err) {
				setResponseOnNode("Something went wrong. Please try again.", responseNode);
			});
	}
})();
