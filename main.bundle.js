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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Game = __webpack_require__(1);
	var game = new Game();
	var lastGenTime = 0;

	$(document).on('keydown', function (event) {
	  game.moveCat(event);
	});

	requestAnimationFrame(function gameLoop() {
	  game.clearCanvas();
	  game.drawHeartsAndCat();
	  game.writePoints();

	  var now = Date.now();
	  var elapsed = (now - lastGenTime) / 1000;

	  if (elapsed > 2) {
	    lastGenTime = now;
	    game.makeObject();
	  }
	  game.checkSushiCollision();
	  game.checkTrashCollision();
	  game.determineContinue(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var lifeCounter = 0;
	var Cat = __webpack_require__(2);
	var Sushi = __webpack_require__(3);
	var Trash = __webpack_require__(4);
	var Heart = __webpack_require__(5);

	var nyanCat = new Cat({ context: context });
	var catDrawMinY = 50;
	var catDrawMaxY = 350;
	var sushis = [];
	var trashes = [];
	var heart1 = new Heart(500, { context: context });
	var heart2 = new Heart(550, { context: context });
	var heart3 = new Heart(600, { context: context });
	var lastGenTime = 0;
	var points = 0;

	function Game() {}

	Game.prototype.moveCat = function (event) {
	  if (event.keyCode === 38) {
	    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height);
	  } else if (event.keyCode === 40) {
	    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height);
	  }
	};

	Game.prototype.clearCanvas = function () {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	};

	Game.prototype.drawHeartsAndCat = function () {
	  nyanCat.draw();
	  heart1.draw();
	  heart2.draw();
	  heart3.draw();
	};

	Game.prototype.writePoints = function () {
	  context.font = "30px Comic Sans MS";
	  context.fillStyle = "magenta";
	  context.fillText("Points: " + points, 20, 40);
	};

	Game.prototype.makeObject = function () {
	  var number = Math.random();
	  if (number > 0.5) {
	    var sushi = new Sushi({ context: context });
	    sushis.push(sushi);
	  } else {
	    var trash = new Trash({ context: context });
	    trashes.push(trash);
	  }
	};

	Game.prototype.checkSushiCollision = function () {
	  for (var i = 0; i < sushis.length; i++) {
	    var currentSushi = sushis[i];
	    currentSushi.draw();
	    currentSushi.move(sushis, i);
	    if (nyanCat.x < currentSushi.x + currentSushi.width && nyanCat.x + nyanCat.width > currentSushi.x && nyanCat.y < currentSushi.y + currentSushi.height && nyanCat.height + nyanCat.y > currentSushi.y) {
	      clearObject(sushis, i);
	      addPoints(30);
	    }
	  }
	};

	Game.prototype.checkTrashCollision = function () {
	  for (var i = 0; i < trashes.length; i++) {
	    var currentTrash = trashes[i];
	    currentTrash.draw();
	    currentTrash.move(trashes, i);
	    if (nyanCat.x < currentTrash.x + currentTrash.width && nyanCat.x + nyanCat.width > currentTrash.x && nyanCat.y < currentTrash.y + currentTrash.height && nyanCat.height + nyanCat.y > currentTrash.y) {
	      clearObject(trashes, i);
	      if (lifeCounter < 3) {
	        loseHeart();
	      }
	    }
	  }
	};

	Game.prototype.determineContinue = function (gameLoop) {
	  if (lifeCounter < 3) {
	    requestAnimationFrame(gameLoop);
	  } else {
	    heart3.image = document.getElementById("empty-heart");
	    heart3.draw();
	    var gameOver = document.getElementById("game-over");
	    context.drawImage(gameOver, 200, 200);
	  }
	};

	function clearObject(collection, index) {
	  collection.splice(index, 1);
	}

	function addPoints(addedPoints) {
	  points += addedPoints;
	}

	function loseHeart() {
	  var hearts = [heart1, heart2, heart3];
	  hearts[lifeCounter].image = document.getElementById("empty-heart");
	  lifeCounter++;
	}

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function Cat(options) {
	  this.image = document.getElementById("nyan-cat-image");
	  this.width = 100;
	  this.height = 100;
	  this.x = 10;
	  this.y = 50;
	  this.context = options.context || {};
	}

	Cat.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  return this;
	};

	function moveCat() {
	  if (event.keyCode === 38) {
	    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height);
	  } else if (event.keyCode === 40) {
	    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height);
	  }
	};

	module.exports = Cat;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function Sushi(options) {
	  var rowsForSprites = [70, 170, 270, 370];
	  var sushiImages = ['egg-roll', 'roe-roll', 'fish-roll'];
	  this.image = document.getElementById(sushiImages[Math.floor(Math.random() * sushiImages.length)]);
	  this.width = 70;
	  this.height = 58;
	  this.x = 600;
	  this.y = rowsForSprites[Math.floor(Math.random() * rowsForSprites.length)];
	  this.context = options.context || {};
	}

	Sushi.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  return this;
	};

	Sushi.prototype.move = function (sushis, index) {
	  this.x -= 3;
	  if (this.x < -70) {
	    clearObject(sushis, index);
	  }
	  return this;
	};

	function clearObject(collection, index) {
	  collection.splice(index, 1);
	}

	module.exports = Sushi;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function Trash(options) {
	  var rowsForTrash = [70, 170, 270, 370];
	  var trashImages = ['kawaii-poop', 'kawaii-toaster'];
	  this.image = document.getElementById(trashImages[Math.floor(Math.random() * trashImages.length)]);
	  this.width = 70;
	  this.height = 58;
	  this.x = 600;
	  this.y = rowsForTrash[Math.floor(Math.random() * rowsForTrash.length)];
	  this.context = options.context || {};;
	}

	Trash.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  return this;
	};

	Trash.prototype.move = function (trashes, index) {
	  this.x -= 3;
	  if (this.x < -70) {
	    clearObject(trashes, index);
	  }
	  return this;
	};

	function clearObject(collection, index) {
	  collection.splice(index, 1);
	}

	module.exports = Trash;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function Heart(x, options) {
	  this.image = document.getElementById("full-heart");
	  this.width = 60;
	  this.height = 60;
	  this.x = x;
	  this.y = 10;
	  this.context = options.context || {};
	}

	Heart.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x, this.y);
	  return this;
	};

	module.exports = Heart;

/***/ }
/******/ ]);