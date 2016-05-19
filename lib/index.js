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

function calculateSpawnTime(gameTimer){
  var spawnTime = 10 / gameTimer
  if (spawnTime < .4){
    spawnTime = .4
  }
  return spawnTime
}

requestAnimationFrame(function gameLoop() {
  game.clearCanvas(context, canvas);
  game.drawHeartsAndCat(context, nyanCat, hearts);
  game.writePoints(context);
  var now = Date.now();
  var gameTimer = (now - startTime)/1000

  var spawnTime = calculateSpawnTime(gameTimer)

  var elapsed = (now - lastGenTime) / 1000;
  if (elapsed > spawnTime){
    lastGenTime = now;
    game.makeObject(context);
  }
  game.addSushi(nyanCat);
  game.addTrash(nyanCat, hearts);
  game.determineContinue(gameLoop, context, heart3);
})
