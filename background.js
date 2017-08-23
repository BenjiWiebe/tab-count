'use strict';

var canvas, tabcount = 0;

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
	browser.browserAction.setIcon({imageData:imgdata});
}

canvas = document.createElement('canvas');
setCount("?");
browser.tabs.onCreated.addListener(plusTabs);
browser.tabs.onRemoved.addListener(minusTabs);
browser.tabs.query({}).then(countTabs, oops);

