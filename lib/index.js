$(document).ready(function(){
})

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var catDrawMinY = 50;
var catDrawMaxY = 350;
var nyanCat = new Cat();
var lastGenTime = 0;

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

var sushis = []

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nyanCat.draw();

  var now = Date.now();
  var elapsed = (now - lastGenTime) / 1000;

  if (elapsed > 3){
    lastGenTime = now;
    var sushi = new Sushi();
    sushis.push(sushi)
  }

  for (var i = 0; i < sushis.length; i++){
    var currentSushi = sushis[i]
    currentSushi.move();
    currentSushi.draw();
    if (nyanCat.x < currentSushi.x + currentSushi.width &&
     nyanCat.x + nyanCat.width > currentSushi.x &&
     nyanCat.y < currentSushi.y + currentSushi.height &&
     nyanCat.height + nyanCat.y > currentSushi.y) {
       context.clearRect(0, 0, canvas.width, canvas.height);
       nyanCat.draw();
       console.log("hai")
    }
  }

  requestAnimationFrame(gameLoop);
})
