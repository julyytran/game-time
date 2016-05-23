var firebase = require('firebase');
require('firebase/database');
var config = {
  apiKey: "AIzaSyB7WYLfPqM1FhRDE6WUEaru-14-d963vN4",
  authDomain: "go-go-nyan-cat.firebaseapp.com",
  databaseURL: "https://go-go-nyan-cat.firebaseio.com",
  storageBucket: "go-go-nyan-cat.appspot.com",
};
var firebaseApp = firebase.initializeApp(config);
var fireDb = firebaseApp.database();
var highscore = 0;

var lifeCounter = 0;
const Sushi = require('./sushi');
const Trash = require('./trash');
const Helpers = require('./helpers');
const Draw = require('./draw');

var draw = new Draw();
var helpers = new Helpers();
var sprites = [];
var points = 0;
var endingFrames = 0;

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
};

Game.prototype.clearCanvas = function(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

Game.prototype.drawHeartsAndCat = function(context, nyanCat, hearts) {
  draw.drawObject(nyanCat);
  for (var i = 0; i < hearts.length; i++){
    draw.drawObject(hearts[i]);
  }
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
    sprites.push(sushi);
  } else {
    var trash = new Trash({context: context});
    sprites.push(trash);
  }
  return sprites;
};

Game.prototype.refreshSprites = function(nyanCat, speed, hearts) {
  //need to preload images,
  var survivors = [];

  for (var i = 0; i < sprites.length; i++) {
    var currentObject = sprites[i];
    currentObject.move(speed);

    if (helpers.checkCollision(currentObject, nyanCat)) {
      var outcome = helpers.determineObject(currentObject, lifeCounter, hearts, points);
      lifeCounter = outcome[0];
      points = outcome[1];
    }
    else if (!helpers.offScreen(currentObject)){
        survivors.push(currentObject);
        draw.drawObject(currentObject);
    }
  }

  sprites = survivors;
  return lifeCounter;
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
  } else {
    this.savePoints();
    this.clearCanvas(context, canvas);
    this.showGameOverScreen();
    this.resetGame(hearts);
  }
};

Game.prototype.savePoints = function(){
  firebase.database().ref('highscore/').set({
    highscore: points
  });
};

Game.prototype.resetGame = function(hearts){
  lifeCounter = 0;
  points = 0;
  endingFrames = 0;
  sprites = [];
  for (var i=0; i < hearts.length; i++){
    hearts[i].image = document.getElementById("full-heart");
  }
  return [lifeCounter, points, sprites];
};

Game.prototype.showGameOverScreen = function(){
  $("#game-over-screen").fadeIn();
  $("#canvas-elements").hide();
};

module.exports = Game;
