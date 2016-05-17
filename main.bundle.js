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

	$(document).ready(function () {});

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var catDrawMinY = 50;
	var catDrawMaxY = 350;
	var nyanCat = new Cat();
	var sushi = new Sushi();

	function Cat() {
	  this.image = document.getElementById("nyan-cat-image");
	  this.width = 100;
	  this.height = 100;
	  this.x = 10;
	  this.y = catDrawMinY;
	  this.context = context;
	}

	Cat.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  return this;
	};

	$(document).on('keydown', function (event) {
	  if (event.keyCode === 38) {
	    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height);
	  } else if (event.keyCode === 40) {
	    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height);
	  }
	});

	function Sushi() {
	  var rowsForSprites = [70, 170, 270, 370];
	  var sushiImages = ['egg-roll', 'roe-roll', 'fish-roll'];
	  this.image = document.getElementById(sushiImages[Math.floor(Math.random() * sushiImages.length)]);
	  // this.image = document.getElementById("egg-roll");
	  this.width = 70;
	  this.height = 58;
	  this.x = 600; //width of the canvas
	  this.y = rowsForSprites[Math.floor(Math.random() * rowsForSprites.length)];
	  this.context = context;
	}

	Sushi.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  return this;
	};

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  nyanCat.draw();
	  sushi.draw();
	  requestAnimationFrame(gameLoop);
	});

/***/ }
/******/ ]);