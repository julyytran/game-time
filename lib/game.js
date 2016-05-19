var lifeCounter = 0;
const Sushi = require('./sushi')
const Trash = require('./trash')
const Helpers = require('./helpers')

var sushis = [];
var trashes = [];
var helpers = new Helpers();
var lastGenTime = 0;
var points = 0;

function Game() {}

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
  nyanCat.draw();
  for (var i = 0; i < hearts.length; i++){
    hearts[i].draw();
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
    sushis.push(sushi);
    return sushi
  } else {
    var trash = new Trash({context: context});
    trashes.push(trash);
    return trash
  }
}

Game.prototype.addSushi = function(nyanCat) {
  for (var i = 0; i < sushis.length; i++) {
    var currentSushi = sushis[i];
    currentSushi.draw();
    currentSushi.move(sushis, i);
    if (helpers.checkCollision(currentSushi, nyanCat)) {
       helpers.clearObject(sushis, i);
       points = helpers.addPoints(points, 30);
    }
  }
}

Game.prototype.addTrash = function(nyanCat, hearts) {
  for (var i = 0; i < trashes.length; i++) {
    var currentTrash = trashes[i];
    currentTrash.draw();
    currentTrash.move(trashes, i);
    if (helpers.checkCollision(currentTrash, nyanCat)) {
       helpers.clearObject(trashes, i);
      lifeCounter = helpers.checkLoseHeart(lifeCounter, hearts, helpers);
    }
  }
}

Game.prototype.determineContinue = function(gameLoop, context, heart3) {
  if (lifeCounter < 3) {
    requestAnimationFrame(gameLoop);
  }
  else {
    heart3.image = document.getElementById("empty-heart");
    heart3.draw();
    var gameOver = document.getElementById("game-over");
    context.drawImage(gameOver, 200, 200)
  }
}

module.exports = Game;
