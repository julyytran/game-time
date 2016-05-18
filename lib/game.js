var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var lifeCounter = 0;
const Cat = require('./cat')
const Sushi = require('./sushi')
const Trash = require('./trash')
const Heart = require('./heart')

var nyanCat = new Cat({context: context});
var catDrawMinY = 50;
var catDrawMaxY = 350;
var sushis = [];
var trashes = [];
var heart1 = new Heart(500, {context: context});
var heart2 = new Heart(550, {context: context});
var heart3 = new Heart(600, {context: context});
var lastGenTime = 0;
var points = 0;

function Game() {}

Game.prototype.moveUp = function(){
  nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height);
}

Game.prototype.moveDown = function(){
  nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height);
}

Game.prototype.clearCanvas = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawHeartsAndCat = function(){
  nyanCat.draw();
  heart1.draw();
  heart2.draw();
  heart3.draw();
}

Game.prototype.writePoints = function(){
  context.font="30px Comic Sans MS";
  context.fillStyle= "magenta";
  context.fillText("Points: " + points, 20, 40);
}

Game.prototype.makeObject = function(){
  var number = Math.random();
  if (number > 0.5) {
    var sushi = new Sushi({context: context});
    sushis.push(sushi);
  } else {
    var trash = new Trash({context: context});
    trashes.push(trash);
  }
}

Game.prototype.checkSushiCollision = function(){
  for (var i = 0; i < sushis.length; i++){
    var currentSushi = sushis[i];
    currentSushi.draw();
    currentSushi.move(sushis, i);
    if (nyanCat.x < currentSushi.x + currentSushi.width &&
     nyanCat.x + nyanCat.width > currentSushi.x &&
     nyanCat.y < currentSushi.y + currentSushi.height &&
     nyanCat.height + nyanCat.y > currentSushi.y) {
       clearObject(sushis, i);
       addPoints(30);
    }
  }
}

Game.prototype.checkTrashCollision = function(){
  for (var i = 0; i < trashes.length; i++){
    var currentTrash = trashes[i];
    currentTrash.draw();
    currentTrash.move(trashes, i);
    if (nyanCat.x < currentTrash.x + currentTrash.width &&
     nyanCat.x + nyanCat.width > currentTrash.x &&
     nyanCat.y < currentTrash.y + currentTrash.height &&
     nyanCat.height + nyanCat.y > currentTrash.y) {
       clearObject(trashes, i);
       if (lifeCounter < 3) {
         loseHeart();
       }
    }
  }
}

Game.prototype.determineContinue = function(gameLoop){
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

function clearObject(collection, index){
  collection.splice(index, 1);
}

function addPoints(addedPoints){
  points += addedPoints;
}

function loseHeart() {
  var hearts = [heart1, heart2, heart3];
  hearts[lifeCounter].image = document.getElementById("empty-heart");
  lifeCounter++;
}

module.exports = Game;
