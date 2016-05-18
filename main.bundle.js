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
	  game.addSushi();
	  game.addTrash();
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
	var Trash = __webpack_require__(5);
	var Heart = __webpack_require__(6);
	var Helpers = __webpack_require__(4);

	var nyanCat = new Cat({ context: context });
	var catDrawMinY = 50;
	var catDrawMaxY = 350;
	var sushis = [];
	var trashes = [];
	var helpers = new Helpers();
	var heart1 = new Heart(500, { context: context });
	var heart2 = new Heart(550, { context: context });
	var heart3 = new Heart(600, { context: context });
	var hearts = [heart1, heart2, heart3];
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

	Game.prototype.addSushi = function () {
	  for (var i = 0; i < sushis.length; i++) {
	    var currentSushi = sushis[i];
	    currentSushi.draw();
	    currentSushi.move(sushis, i);
	    if (helpers.checkCollision(currentSushi, nyanCat)) {
	      helpers.clearObject(sushis, i);
	      points = helpers.addPoints(points, 30);
	    }
	  }
	};

	Game.prototype.addTrash = function () {
	  for (var i = 0; i < trashes.length; i++) {
	    var currentTrash = trashes[i];
	    currentTrash.draw();
	    currentTrash.move(trashes, i);
	    if (helpers.checkCollision(currentTrash, nyanCat)) {
	      helpers.clearObject(trashes, i);
	      lifeCounter = helpers.checkLoseHeart(lifeCounter, hearts, helpers);
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

	module.exports = Cat;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Helpers = __webpack_require__(4);
	var helpers = new Helpers();

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
	    helpers.clearObject(sushis, index);
	  }
	  return this;
	};

	module.exports = Sushi;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function Helpers() {};

	Helpers.prototype.clearObject = function (collection, index) {
	  collection.splice(index, 1);
	};

	Helpers.prototype.addPoints = function (points, addedPoints) {
	  points += addedPoints;
	  return points;
	};

	Helpers.prototype.loseHeart = function (hearts, lifeCounter) {
	  hearts[lifeCounter].image = document.getElementById("empty-heart");
	  lifeCounter++;
	  return lifeCounter;
	};

	Helpers.prototype.checkCollision = function (currentSushi, nyanCat) {
	  return nyanCat.x < currentSushi.x + currentSushi.width && nyanCat.x + nyanCat.width > currentSushi.x && nyanCat.y < currentSushi.y + currentSushi.height && nyanCat.height + nyanCat.y > currentSushi.y;
	};

	Helpers.prototype.checkLoseHeart = function (lifeCounter, hearts, helpers) {
	  if (lifeCounter < 3) {
	    return lifeCounter = helpers.loseHeart(hearts, lifeCounter);
	  };
	};

	module.exports = Helpers;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Helpers = __webpack_require__(4);
	var helpers = new Helpers();

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
	    helpers.clearObject(trashes, index);
	  }
	  return this;
	};

	module.exports = Trash;

/***/ },
/* 6 */
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