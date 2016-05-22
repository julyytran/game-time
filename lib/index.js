$(document).ready(function(){
  $("#start-button").on("click", showCanvas);
  $("#restart-button").on("click", showStartScreen);
});

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var starfield = document.getElementById('starfield');
var starfieldCtx = starfield.getContext('2d');

starfieldCtx.beginPath();
starfieldCtx.fillStyle = "#003466";
starfieldCtx.rect(0, 0, starfield.width, starfield.height);
starfieldCtx.fill();
starfieldCtx.beginPath();
for(var n = 0 ; n < 100; n++){
    var x = parseInt(Math.random() * canvas.width);
    var y = parseInt(Math.random() * canvas.height);
    var radius = Math.random() * 3;
    starfieldCtx.arc(x, y, radius, 0, Math.PI * 2,false);
    starfieldCtx.closePath();
}
starfieldCtx.fillStyle = "white";
starfieldCtx.fill();

// create an new image using the starfield canvas
var img = document.createElement("img");
img.src = starfield.toDataURL();

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
  $("#game").show()
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
