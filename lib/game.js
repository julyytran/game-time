var lifeCounter = 0;
const Sushi = require('./sushi');
const Trash = require('./trash');
const Helpers = require('./helpers');
const Draw = require('./draw');
const Scoreboard = require('./scoreboard');

var draw = new Draw();
var helpers = new Helpers();
var scoreboard = new Scoreboard();
var sprites = [];
var points = 0;
var endingFrames = 0;
var boom_sound = document.getElementById("boom-sound");

function Game(){}

Game.prototype.calculateSpawnTime = function(rate, minSpeed, maxSpeed, gameTimer) {
  return Math.max(rate * gameTimer + maxSpeed, minSpeed);
};

Game.prototype.calculateSpeed = function(rate, minSpeed, maxSpeed, gameTimer) {
  return Math.min(rate * gameTimer + minSpeed, maxSpeed);
};

Game.prototype.moveCat = function(event, nyanCat) {
  if (event.keyCode === 38) {
    nyanCat.moveUp();
  }
  else if (event.keyCode === 40) {
    nyanCat.moveDown();
  }
  return nyanCat;
};

Game.prototype.clearCanvas = function(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

Game.prototype.drawHeartsCatAndBombs = function(nyanCat, hearts, bombs) {
  draw.drawCollection(hearts);
  draw.drawCollection(bombs);
  draw.drawCat(nyanCat);
};

Game.prototype.writePoints = function(context) {
  context.font="30px VT323";
  context.fillStyle= "magenta";
  context.fillText("Points: " + points, 20, 40);
};

Game.prototype.makeObject = function(context) {
  var number = Math.random();
  if (number > 0.5) {
    var sushi = new Sushi({context: context});
    sushi.x = 600;
    sprites.push(sushi);
  } else {
    var trash = new Trash({context: context});
    sprites.push(trash);
  }
  return sprites;
};

Game.prototype.refreshSprites = function(nyanCat, speed, hearts, bomb, boom) {
  var survivors = [];

  if (bomb){
    helpers.playCollisionSound(boom_sound);
    draw.drawObject(boom);
  }
  else {
    survivors = this.moveSprites(nyanCat, speed, hearts, survivors);
  }
  sprites = survivors;
};

Game.prototype.moveSprites = function(nyanCat, speed, hearts, survivors){
  for (var i = 0; i < sprites.length; i++) {
    var currentObject = sprites[i];
    currentObject.move(speed);

    if (helpers.checkCollision(currentObject, nyanCat)) {
      var outcome = helpers.determineObject(currentObject, lifeCounter, hearts, points);
      lifeCounter = outcome[0];
      points = outcome[1];
    }
    else if (!helpers.offScreen(currentObject)) {
      survivors.push(currentObject);
      draw.drawObject(currentObject);
    }
  }
  return survivors;
};

Game.prototype.determineContinue = function(gameLoop, context, canvas, hearts) {
  if (lifeCounter < 3) {
    requestAnimationFrame(gameLoop);
  }
  else {
    endingFrames++;
    this.endGame(gameLoop, context, canvas, hearts);
  }
};

Game.prototype.endGame = function(gameLoop, context, canvas, hearts) {
  if (endingFrames < 25) {
    requestAnimationFrame(gameLoop);
  }
  else {
    scoreboard.showHighScoreEntry(points);
    this.clearCanvas(context, canvas);
    this.showGameOverScreen();
    this.resetGame(hearts);
  }
};

Game.prototype.resetGame = function(hearts){
  lifeCounter = 0;
  endingFrames = 0;
  sprites = [];
  for (var i=0; i < hearts.length; i++){
    hearts[i].image = document.getElementById("full-heart");
  }
  return [lifeCounter, endingFrames, sprites];
};

Game.prototype.showGameOverScreen = function(){
  $("#game-over-screen").fadeIn();
  $('#player-score').text("Your score: " + points);
  $("#canvas-elements").hide();
};

Game.prototype.sendHighScore = function(){
    scoreboard.sendHighScore(points);
};

Game.prototype.resetPoints = function(){
  points = 0;
  return points;
};

module.exports = Game;
