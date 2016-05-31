let lifeCounter = 0;
const Sushi = require('./sushi');
const Trash = require('./trash');
const Helpers = require('./helpers');
const Draw = require('./draw');
const Scoreboard = require('./scoreboard');

let draw = new Draw();
let helpers = new Helpers();
let scoreboard = new Scoreboard();
let sprites = [];
let points = 0;
let endingFrames = 0;
let boom_sound = document.getElementById("boom-sound");

class Game {
  constructor() {}

  calculateSpawnTime(rate, minSpeed, maxSpeed, gameTimer) {
    return Math.max(rate * gameTimer + maxSpeed, minSpeed);
  }

  calculateSpeed(rate, minSpeed, maxSpeed, gameTimer) {
    return Math.min(rate * gameTimer + minSpeed, maxSpeed);
  }

  moveCat(event, nyanCat) {
    if (event.keyCode === 38) {
      nyanCat.moveUp();
    }
    else if (event.keyCode === 40) {
      nyanCat.moveDown();
    }
    return nyanCat;
  }

  clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawHeartsCatAndBombs(nyanCat, hearts, bombs) {
    draw.drawCollection(hearts);
    draw.drawCollection(bombs);
    draw.drawCat(nyanCat);
  }

  writePoints(context) {
    context.font="30px VT323";
    context.fillStyle= "magenta";
    context.fillText("Points: " + points, 20, 40);
  }

  makeObject(context) {
    let number = Math.random();
    if (number > 0.5) {
      let sushi = new Sushi({context: context});
      sushi.x = 600;
      sprites.push(sushi);
    } else {
      let trash = new Trash({context: context});
      sprites.push(trash);
    }
    return sprites;
  }

  refreshSprites(nyanCat, speed, hearts, bomb, boom) {
    let survivors = [];

    if (bomb){
      helpers.playCollisionSound(boom_sound);
      draw.drawObject(boom);
    }
    else {
      survivors = this.moveSprites(nyanCat, speed, hearts, survivors);
    }
    sprites = survivors;
  }

  moveSprites(nyanCat, speed, hearts, survivors) {
    for (let i = 0; i < sprites.length; i++) {
      let currentObject = sprites[i];
      currentObject.move(speed);

      if (helpers.checkCollision(currentObject, nyanCat)) {
        let outcome = helpers.determineObject(currentObject, lifeCounter, hearts, points);
        lifeCounter = outcome[0];
        points = outcome[1];
      }
      else if (!helpers.offScreen(currentObject)) {
        survivors.push(currentObject);
        draw.drawObject(currentObject);
      }
    }
    return survivors;
  }

  determineContinue(gameLoop, context, canvas, hearts) {
    if (lifeCounter < 3) {
      requestAnimationFrame(gameLoop);
    }
    else {
      endingFrames++;
      this.endGame(gameLoop, context, canvas, hearts);
    }
  }

  endGame(gameLoop, context, canvas, hearts) {
    if (endingFrames < 25) {
      requestAnimationFrame(gameLoop);
    }
    else {
      scoreboard.showHighScoreEntry(points);
      this.clearCanvas(context, canvas);
      this.showGameOverScreen();
      this.resetGame(hearts);
    }
  }

  resetGame(hearts) {
    lifeCounter = 0;
    endingFrames = 0;
    sprites = [];
    for (let i=0; i < hearts.length; i++){
      hearts[i].image = document.getElementById("full-heart");
    }
    return [lifeCounter, endingFrames, sprites];
  }

  showGameOverScreen() {
    $("#game-over-screen").fadeIn();
    $('#player-score').text("Your score: " + points);
    $("#canvas-elements").hide();
  }

  sendHighScore() {
    scoreboard.sendHighScore(points);
  }

  resetPoints() {
    points = 0;
    return points;
  }
}

module.exports = Game;
