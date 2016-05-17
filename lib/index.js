$(document).ready(function(){
})

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var catDrawMinY = 50;
var catDrawMaxY = 350;
var nyanCat = new Cat();

function Cat() {
  this.image = document.getElementById("nyan-cat-image");
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = catDrawMinY;
  this.context = context;
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

$(document).on('keydown', function(event){
  if (event.keyCode === 38) {
    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height)
  }
  else if (event.keyCode === 40) {
    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height)
  }
});

function Sushi(){
  var rowsForSprites = [70, 170, 270, 370]
  var sushiImages = ['egg-roll', 'roe-roll', 'fish-roll']
  this.image = document.getElementById(sushiImages[Math.floor(Math.random() * sushiImages.length)]);
  this.width = 70;
  this.height = 58;
  this.x = 600; //width of the canvas
  this.y = rowsForSprites[Math.floor(Math.random() * rowsForSprites.length)];
  this.context = context;
}

Sushi.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

Sushi.prototype.move = function () {
  this.x -= 3;
  return this;
}

var sushi = new Sushi();
var secondSushi = new Sushi();
var lastTime;
var counter = 0;
var startTime = Date.now();

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  var now = Date.now();
  // var dt = (now - lastTime) / 1000.0;
  // counter += dt
  var timeElapsed = (now - startTime) / 1000
  // console.log(timeElapsed)
  // console.log(timeElapsed)
  nyanCat.draw();
  // for (var i = 0; i < 10; i++) {
    // sushi.draw()
    // sushi.move()
    console.log(timeElapsed)
  if (Math.floor(timeElapsed) > 5 && Math.floor(timeElapsed) < 10){
    sushi.draw()
    sushi.move()
    // console.log('hey!')
  }

  if (Math.floor(timeElapsed) > 8 && Math.floor(timeElapsed) < 15){
    secondSushi.draw()
    secondSushi.move()
    console.log('hey!')
  }

  // lastTime = now;
    // }
  //first frame- draw sushi, move it for a series of frames
  //next frame- draw new sushi on time interval which increases with difficulty
    // sushi.draw()
    // sushi.move()

  requestAnimationFrame(gameLoop);
})
