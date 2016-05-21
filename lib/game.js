var lifeCounter = 0;
const Sushi = require('./sushi');
const Trash = require('./trash');
const Helpers = require('./helpers');
const Draw = require('./draw')

var draw = new Draw();
var helpers = new Helpers();
var sprites = []
var points = 0;
var speed = 3;

function Game(){}

Game.prototype.calculateSpawnTime = function(rate, minSpeed, maxSpeed, gameTimer) {
  return Math.max(rate * gameTimer + maxSpeed, minSpeed)
}

Game.prototype.calculateSpeed = function(rate, minSpeed, maxSpeed, gameTimer) {
  return Math.min(rate * gameTimer + minSpeed, maxSpeed)
}

Game.prototype.moveCat = function(event, nyanCat) {
  if (event.keyCode === 38) {
    nyanCat.moveUp();
  }
  else if (event.keyCode === 40) {
    nyanCat.moveDown();
  }
}

Game.prototype.clearCanvas = function(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawHeartsAndCat = function(context, nyanCat, hearts) {
  draw.drawObject(nyanCat)
  for (var i = 0; i < hearts.length; i++){
    draw.drawObject(hearts[i]);
  }
}

Game.prototype.writePoints = function(context) {
  context.font="30px Comic Sans MS";
  context.fillStyle= "magenta";
  context.fillText("Points: " + points, 20, 40);
}

Game.prototype.makeObject = function(context) {
  var number = Math.random();
  if (number > 0.5) {
    var sushi = new Sushi({context: context});
    sprites.push(sushi);
  } else {
    var trash = new Trash({context: context});
    sprites.push(trash);
  }
  return sprites
}

Game.prototype.refreshSprites = function(nyanCat, speed, hearts) {
  var survivors = []

  for (var i = 0; i < sprites.length; i++) {
    var currentObject = sprites[i];
    currentObject.move(speed);

    if (helpers.checkCollision(currentObject, nyanCat)) {
      var outcome = helpers.determineObject(currentObject, lifeCounter, hearts, points)
      lifeCounter = outcome[0]
      points = outcome[1]
    }
    else if (!helpers.offScreen(currentObject)){
        survivors.push(currentObject)
        draw.drawObject(currentObject);
    }
  }

  sprites = survivors
}

Game.prototype.determineContinue = function(gameLoop, context, heart3) {
  if (lifeCounter < 3) {
    requestAnimationFrame(gameLoop);
  }
  else {
    heart3.image = document.getElementById("empty-heart");
    draw.drawObject(heart3)
    var gameOver = document.getElementById("game-over");
    context.drawImage(gameOver, 200, 200);
    showGameOverScreen()
  }
}

function showGameOverScreen(){
  $("#game-over-screen").show();
  $("#game").hide();
}

module.exports = Game;
