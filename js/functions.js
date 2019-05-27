"use strict";

var client;
window.init = function() {
  client = new ApiAi.ApiAiClient({accessToken: "16a9c2a5ff0b4dc58deb74a9c262ae3d"});
};

function welcomeEvent() {
  return client.eventRequest('WELCOME');
}

function sendText(text) {
  return client.textRequest(text);
}
