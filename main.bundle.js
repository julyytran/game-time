/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	$(document).ready(function () {
	  $('#nyan-cat-image').hide();
	});

	var direction = "right";

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	// var nyanCat = new Cat();

	// function Cat(x, y, width, height, context) {
	//   this.image = document.getElementById("nyan-cat-image");
	//   context.drawImage(this.image, 10, 10)
	// this.x = x;
	// this.y = y;
	// this.width = width;
	// this.height = height;
	// this.context = context;
	// }

	// Cat.prototype.draw = function () {
	//   this.context.drawImage(nyanCat, 10, 10);;
	// this.context.fillRect(this.x, this.y, this.width, this.height);
	// move(this, direction);
	// return this;
	// }

	// var nyanCat = new Cat(50, 50, 10, 10, context);
	// var firstBlock = new Block(50, 50, 10, 10, context);

	var nyanCat = document.getElementById("nyan-cat-image");

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
	  context.drawImage(nyanCat, 10, 10);
	  // nyanCat.draw()
	  requestAnimationFrame(gameLoop);
	});
	//
	// $(document).on('keydown', function(key) {
	//   if (key.keyCode === 39) {
	//     direction = "right";
	//   } else if (key.keyCode === 40) {
	//     direction = "up";
	//   } else if (key.keyCode === 37) {
	//     direction = "left";
	//   } else if (key.keyCode === 38) {
	//     direction = "down";
	//   }
	// });
	//
	// var move = function(object, direction) {
	//   if (direction === "right") {
	//     object.x++;
	//   } else if (direction === "left") {
	//     object.x--;
	//   } else if (direction === "down") {
	//     object.y--;
	//   } else if (direction === "up") {
	//     object.y++;
	//   }
	// }

/***/ }
/******/ ]);