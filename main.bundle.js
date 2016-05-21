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

	"use strict";

	$(document).ready(function () {
	  $("#start-button").on("click", showCanvas);
	});

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var Game = __webpack_require__(1);
	var Heart = __webpack_require__(6);
	var Cat = __webpack_require__(7);

	var game = new Game();
	var nyanCat = new Cat({ context: context });
	var heart1 = new Heart(500, { context: context });
	var heart2 = new Heart(550, { context: context });
	var heart3 = new Heart(600, { context: context });
	var hearts = [heart1, heart2, heart3];
	var lastGenTime = 0;
	var startTime = Date.now();

	$(document).on('keydown', function (event) {
	  game.moveCat(event, nyanCat);
	});

	function showCanvas() {
	  $("#game").show();
	  $("#start-screen").hide();
	}

	requestAnimationFrame(function gameLoop() {
	  game.clearCanvas(context, canvas);
	  game.drawHeartsAndCat(context, nyanCat, hearts);
	  game.writePoints(context);
	  var now = Date.now();
	  var gameTimer = (now - startTime) / 1000;

	  var speed = game.calculateSpeed(0.07, 3, 10, gameTimer);

	  var spawnTime = game.calculateSpawnTime(-0.05, 0.2, 2.5, gameTimer);

	  var elapsed = (now - lastGenTime) / 1000;
	  if (elapsed > spawnTime) {
	    lastGenTime = now;
	    game.makeObject(context);
	  }
	  game.refreshSprites(nyanCat, speed, hearts);
	  game.determineContinue(gameLoop, context, heart3);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lifeCounter = 0;
	var Sushi = __webpack_require__(2);
	var Trash = __webpack_require__(3);
	var Helpers = __webpack_require__(4);
	var Draw = __webpack_require__(5);

	var draw = new Draw();
	var helpers = new Helpers();
	var sprites = [];
	var points = 0;
	var speed = 3;

	function Game() {}

	Game.prototype.calculateSpawnTime = function (rate, minSpeed, maxSpeed, gameTimer) {
	  return Math.max(rate * gameTimer + maxSpeed, minSpeed);
	};

	Game.prototype.calculateSpeed = function (rate, minSpeed, maxSpeed, gameTimer) {
	  return Math.min(rate * gameTimer + minSpeed, maxSpeed);
	};

	Game.prototype.moveCat = function (event, nyanCat) {
	  if (event.keyCode === 38) {
	    nyanCat.moveUp();
	  } else if (event.keyCode === 40) {
	    nyanCat.moveDown();
	  }
	};

	Game.prototype.clearCanvas = function (context, canvas) {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	};

	Game.prototype.drawHeartsAndCat = function (context, nyanCat, hearts) {
	  draw.drawObject(nyanCat);
	  for (var i = 0; i < hearts.length; i++) {
	    draw.drawObject(hearts[i]);
	  }
	};

	Game.prototype.writePoints = function (context) {
	  context.font = "30px Comic Sans MS";
	  context.fillStyle = "magenta";
	  context.fillText("Points: " + points, 20, 40);
	};

	Game.prototype.makeObject = function (context) {
	  var number = Math.random();
	  if (number > 0.5) {
	    var sushi = new Sushi({ context: context });
	    sprites.push(sushi);
	  } else {
	    var trash = new Trash({ context: context });
	    sprites.push(trash);
	  }
	  return sprites;
	};

	Game.prototype.refreshSprites = function (nyanCat, speed, hearts) {
	  var survivors = [];

	  for (var i = 0; i < sprites.length; i++) {
	    var currentObject = sprites[i];
	    currentObject.move(speed);

	    if (helpers.checkCollision(currentObject, nyanCat)) {
	      var outcome = helpers.determineObject(currentObject, lifeCounter, hearts, points);
	      lifeCounter = outcome[0];
	      points = outcome[1];
	    } else if (!helpers.offScreen(currentObject)) {
	      survivors.push(currentObject);
	      draw.drawObject(currentObject);
	    }
	  }

	  sprites = survivors;

	  // create empty survivor array
	  //only push onto array things that dont get hit or dont go offScreen
	  //after all sprites are sorted, set the sprite array = to survivor
	  //this clear everything that shouldn't survive to the next frame
	};

	Game.prototype.determineContinue = function (gameLoop, context, heart3) {
	  if (lifeCounter < 3) {
	    requestAnimationFrame(gameLoop);
	  } else {
	    heart3.image = document.getElementById("empty-heart");
	    draw.drawObject(heart3);
	    var gameOver = document.getElementById("game-over");
	    context.drawImage(gameOver, 200, 200);
	  }
	};

	module.exports = Game;

/***/ },
/* 2 */
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

	Sushi.prototype.move = function (speed) {
	  this.x -= speed;
	  return this;
	};

	module.exports = Sushi;

/***/ },
/* 3 */
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

	Trash.prototype.move = function (speed) {
	  this.x -= speed;
	  return this;
	};

	module.exports = Trash;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function Helpers() {};

	Helpers.prototype.clearObject = function (collection, index) {
	  collection.splice(index, 1);
	  return collection;
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

	Helpers.prototype.checkCollision = function (currentObject, nyanCat) {
	  return nyanCat.x < currentObject.x + currentObject.width && //make these variables
	  nyanCat.x + nyanCat.width > currentObject.x && nyanCat.y < currentObject.y + currentObject.height && nyanCat.height + nyanCat.y > currentObject.y;
	};

	Helpers.prototype.offScreen = function (currentObject) {
	  return currentObject.x < -70;
	};

	Helpers.prototype.determineObject = function (currentObject, lifeCounter, hearts, points) {
	  if (currentObject.constructor.name === "Sushi") {
	    points = this.addPoints(points, 30);
	  } else if (currentObject.constructor.name === "Trash") {
	    lifeCounter = this.checkLoseHeart(lifeCounter, hearts);
	  }
	  return [lifeCounter, points];
	};

	Helpers.prototype.checkLoseHeart = function (lifeCounter, hearts) {
	  if (lifeCounter < 3) {
	    return lifeCounter = this.loseHeart(hearts, lifeCounter);
	  };
	};

	module.exports = Helpers;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function Draw() {}

	Draw.prototype.drawObject = function (object) {
	  object.context.drawImage(object.image, object.x, object.y);
	  return object;
	};

	module.exports = Draw;

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

	module.exports = Heart;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var catDrawMinY = 50;
	var catDrawMaxY = 350;

	function Cat(options) {
	  this.image = document.getElementById("nyan-cat-image");
	  this.width = 100;
	  this.height = 100;
	  this.x = 10;
	  this.y = 50;
	  this.context = options.context || {};
	}

	Cat.prototype.moveUp = function () {
	  this.y = Math.max(catDrawMinY, this.y - this.height);
	};

	Cat.prototype.moveDown = function () {
	  this.y = Math.min(catDrawMaxY, this.y + this.height);
	};

	module.exports = Cat;

/***/ }
/******/ ]);