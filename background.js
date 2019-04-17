'use strict';

var canvas, tabcount = 0, debugging = false;

function oops(error) {
	setCount("!");
}

function countTabs(tabs) {
	tabcount = tabs.length;
	setCount(tabcount);
}

function plusTabs() {
	tabcount += 1;
	setCount(tabcount);
}

function minusTabs() {
	tabcount -= 1;
	setCount(tabcount);
}

// This function CAN handle a non-numeric input.
function setCount(num) {
	var msg = "" + num;
	canvas.height = 30;
	canvas.width = msg.length * 18;
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Courier";
	ctx.textBaseline = "top";
	ctx.fillText(msg,0,0);
	var imgdata = ctx.getImageData(0,0,canvas.width,canvas.height);
	if(!debugging) {
		browser.browserAction.setIcon({imageData:imgdata});
	}
}

if(typeof browser == "undefined") { // We are running in the test.html page
	window.onload = function () {
		debugging = true;
		console.log("Detected debug page");
		canvas = document.getElementById('canvas');
		canvas.style.border = "thick solid red";
		setCount("124 Oy"); // Some numbers, a capital letter, and a letter with a tail, to check if it fits.
	};
} else {
	canvas = document.createElement('canvas');
	setCount("?");
	browser.tabs.onCreated.addListener(plusTabs);
	browser.tabs.onRemoved.addListener(minusTabs);
	browser.tabs.query({}).then(countTabs, oops);
}

