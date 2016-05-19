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
// var lastSpeedIncrease = 0

$(document).on('keydown', function(event){
  game.moveCat(event, nyanCat);
});

// function calculateSpeed(gameTimer){
//   var timeSinceLastSpeedIncrease = (Date.now() - lastSpeedIncrease)/1000
//   if (timeSinceLastSpeedIncrease > 10){
//     speed++
//     lastSpeedIncrease = Date.now()
//   }
//   if (speed > 10){
//     speed = 10
//   }
//   console.log(speed)
//   return speed
// }

requestAnimationFrame(function gameLoop() {
  game.clearCanvas(context, canvas);
  game.drawHeartsAndCat(context, nyanCat, hearts);
  game.writePoints(context);
  var now = Date.now();
  var gameTimer = (now - startTime)/1000;

  var speed = game.calculateSpeed(Date.now());

  var spawnTime = game.calculateSpawnTime(gameTimer);

  var elapsed = (now - lastGenTime) / 1000;
  if (elapsed > spawnTime){
    lastGenTime = now;
    game.makeObject(context);
  }
  game.addSushi(nyanCat, speed);
  game.addTrash(nyanCat, hearts, speed);
  game.determineContinue(gameLoop, context, heart3);
})
