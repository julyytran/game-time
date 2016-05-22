$(document).ready(function(){
  $("#start-button").on("click", showCanvas);
  $("#restart-button").on("click", showStartScreen);
});

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var starfield = document.getElementById('starfield');
var starfieldCtx = starfield.getContext('2d');

const Background = require('./background');
var background = new Background({starfield: starfield, starfieldCtx: starfieldCtx, canvas: canvas});

var backgroundImage = background.randomStarsImage(starfieldCtx, canvas, starfield);
var fps = 60;
var offsetLeft = 0;
panStars();

function panStars() {
    offsetLeft += 1;
    if (offsetLeft > backgroundImage.width){ offsetLeft = 0; }

    background.clearCanvas();
    background.draw(backgroundImage, offsetLeft)

    setTimeout(function() {
        requestAnimationFrame(panStars);
    }, 1000 / fps);
}
// const Background = require('./background');
// var background = new Background();
//
// var backgroundImage = background.randomStarsImage(starfieldCtx, canvas, starfield);
// var fps = 60;
// var offsetLeft = 0;
// panStars();
//
// function panStars() {
//     offsetLeft += 1;
//     if (offsetLeft > backgroundImage.width){ offsetLeft = 0; }
//
//     background.clearCanvas(starfieldCtx, starfield);
//     background.draw(starfieldCtx, backgroundImage, offsetLeft)
//
//     setTimeout(function() {
//         requestAnimationFrame(panStars);
//     }, 1000 / fps);
// }

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
var lifeCounter = 0;

$(document).on('keydown', function(event){
  game.moveCat(event, nyanCat);
});

function showStartScreen(){
  $("#game-over-screen").hide();
  $("#start-screen").show();
}

function showCanvas(){
  $("#start-screen").hide();
  $("#canvas-elements").show()
  var startTime = Date.now();
  startGame(startTime);
}

function startGame(startTime){
  requestAnimationFrame(function gameLoop() {
    game.clearCanvas(context, canvas);
    game.drawHeartsAndCat(context, nyanCat, hearts);
    game.writePoints(context);
    var now = Date.now();
    var gameTimer = (now - startTime)/1000;

    var speed = game.calculateSpeed(0.07, 3, 10, gameTimer);

    var spawnTime = game.calculateSpawnTime(-0.05, 0.2, 2.5, gameTimer);

    var elapsed = (now - lastGenTime) / 1000;
    if (elapsed > spawnTime){
      lastGenTime = now;
      game.makeObject(context);
    }
    game.refreshSprites(nyanCat, speed, hearts);
    game.determineContinue(gameLoop, context, canvas, hearts);
  })
}
