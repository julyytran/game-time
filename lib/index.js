var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const Game = require('./game');
const Heart = require('./heart')
const Cat = require('./cat')

var game = new Game();
var nyanCat = new Cat({context: context});
var heart1 = new Heart(500, {context: context});
var heart2 = new Heart(550, {context: context});
var heart3 = new Heart(600, {context: context});
var hearts = [heart1, heart2, heart3];
var lastGenTime = 0;
var startTime = Date.now();

$(document).on('keydown', function(event){
  game.moveCat(event, nyanCat);
});

requestAnimationFrame(function gameLoop() {
  game.clearCanvas(context, canvas);
  game.drawHeartsAndCat(context, nyanCat, hearts);
  game.writePoints(context);
  var now = Date.now();
  var gameTimer = (now - startTime)/1000;
  debugger

  var speed = game.calculateSpeed(0.07, 3, 10, gameTimer);

  var spawnTime = game.calculateSpawnTime(-0.05, 0.2, 2.5, gameTimer);

  console.log("spawn time" + spawnTime)
  console.log("speed" + speed)

  var elapsed = (now - lastGenTime) / 1000;
  if (elapsed > spawnTime){
    lastGenTime = now;
    game.makeObject(context);
  }
  game.addSushi(nyanCat, speed);
  game.addTrash(nyanCat, hearts, speed);
  game.determineContinue(gameLoop, context, heart3);
})
