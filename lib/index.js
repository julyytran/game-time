$(document).ready(function(){
  scoreboard.loadScoreboard();
  $("#start-button").on("click", showCanvas);
  $("#restart-button").on("click", showStartScreen);
  $("#submit-name").on("click", game.sendHighScore);
});

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let starfield = document.getElementById('starfield');
let starfieldCtx = starfield.getContext('2d');

const Game = require('./game');
const Heart = require('./heart');
const Bomb = require('./bomb');
const Cat = require('./cat');
const Background = require('./background');
const Scoreboard = require('./scoreboard');
const Boom = require('./boom');

let game = new Game();
let background = new Background({starfield: starfield, starfieldCtx: starfieldCtx, canvas: canvas});
let nyanCat = new Cat({context: context});
let heart1 = new Heart(500, {context: context});
let heart2 = new Heart(550, {context: context});
let heart3 = new Heart(600, {context: context});
let bomb1 = new Bomb(250, {context: context});
let bomb2 = new Bomb(300, {context: context});
let bomb3 = new Bomb(350, {context: context});
let bombs = [bomb1, bomb2, bomb3];
let boom = new Boom({context: context});
let scoreboard = new Scoreboard();
let hearts = [heart1, heart2, heart3];
let lastGenTime = 0;
let backgroundImage = background.randomStarsImage(starfieldCtx, canvas, starfield);
let offsetLeft = 0;
let bomb = false;

$(document).on('keydown', function(event){
  if (event.keyCode === 38 || event.keyCode === 40){
    game.moveCat(event, nyanCat);
  }
  else if (event.keyCode === 32 && bombs.length > 0){
    bombs.pop();
    bomb = true;
  }
});

function showStartScreen(){
  $("#game-over-screen").hide();
  $("#start-screen").show();
  scoreboard.loadScoreboard();
}

function showCanvas(){
  $("#start-screen").hide();
  $("#canvas-elements").show();
  let startTime = Date.now();
  game.resetPoints();
  bombs = [bomb1, bomb2, bomb3];
  startGame(startTime);
}

function startGame(startTime){
  requestAnimationFrame(function gameLoop() {
    document.getElementById("starfield").style.background ="#003466";

    offsetLeft += 2;
    if (offsetLeft > backgroundImage.width){ offsetLeft = 0; }

    background.clearCanvas();
    background.draw(backgroundImage, offsetLeft);

    game.clearCanvas(context, canvas);
    game.drawHeartsCatAndBombs(nyanCat, hearts, bombs);
    game.writePoints(context);
    let now = Date.now();
    let gameTimer = (now - startTime)/1000;

    let speed = game.calculateSpeed(0.07, 5, 10, gameTimer);

    let spawnTime = game.calculateSpawnTime(-0.05, 0.2, 2.0, gameTimer);

    let elapsed = (now - lastGenTime) / 1000;
    if (elapsed > spawnTime){
      lastGenTime = now;
      game.makeObject(context);
    }
    game.refreshSprites(nyanCat, speed, hearts, bomb, boom);
    bomb = false;

    game.determineContinue(gameLoop, context, canvas, hearts);
  });
}
