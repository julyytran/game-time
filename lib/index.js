const Game = require('./game');
var game = new Game();
var lastGenTime = 0;

$(document).on('keydown', function(event){
  game.moveCat(event);
});

requestAnimationFrame(function gameLoop() {
  game.clearCanvas();
  game.drawHeartsAndCat();
  game.writePoints();

  var now = Date.now();
  var elapsed = (now - lastGenTime) / 1000;

  if (elapsed > 2){
    lastGenTime = now;
    game.makeObject();
  }
  game.addSushi();
  game.addTrash();
  game.determineContinue(gameLoop);
})
