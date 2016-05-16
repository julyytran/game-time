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
	  $(document).on('keydown', getDirection);
	});

	var direction = "still";
	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var nyanCat = new Cat();

	function Cat() {
	  this.image = document.getElementById("nyan-cat-image");
	  this.width = 100;
	  this.height = 100;
	  this.x = 10;
	  this.y = 200;
	  this.context = context;
	}

	Cat.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  move(this, direction);
	  return this;
	};

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  nyanCat.draw();
	  requestAnimationFrame(gameLoop);
	});

	function getDirection(key) {
	  if (key.keyCode === 40) {
	    direction = "up";
	  } else if (key.keyCode === 38) {
	    direction = "down";
	  }
	};

	var move = function move(object, direction) {
	  if (direction === "down") {
	    if (object.y > 10) {
	      object.y = object.y - 3;
	    }
	  } else if (direction === "up") {
	    if (object.y < 400) {
	      object.y = object.y + 3;
	    }
	  } else if (direction === "still") {
	    console.log("hey");
	  }
	};

/***/ }
/******/ ]);