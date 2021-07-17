'use strict';

var canvas, tabcount = 0, debugging = false, icon_ctx, icon_size = 32;
var font = "28px caption";

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
	ctx.font = font;
	ctx.textBaseline = "top";
	ctx.fillText(msg,0,0);
	var imgdata = ctx.getImageData(0,0,canvas.width,canvas.height);
	if(!debugging) {
		browser.browserAction.setIcon({imageData:imgdata});
	} else {
		icon_ctx.clearRect(0,0,icon_size,icon_size);
		icon_ctx.putImageData(imgdata, 0, 0);
	}
}

if(typeof browser == "undefined") { // We are running in the test.html page
	window.onload = function () {
		debugging = true;
		console.log("Detected debug page");
		var icon_canvas = document.getElementById('icon');
		icon_canvas.width = icon_size;
		icon_canvas.height = icon_size;
		icon_ctx = icon_canvas.getContext("2d");
		canvas = document.getElementById('canvas');
		setCount("124 Oy"); // Some numbers, a capital letter, and a letter with a tail, to check if it fits.
	};
} else {
	canvas = document.createElement('canvas');
	setCount("?");
	browser.tabs.onCreated.addListener(plusTabs);
	browser.tabs.onRemoved.addListener(minusTabs);
	browser.tabs.query({}).then(countTabs, oops);
}

