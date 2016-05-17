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

$(document).on('keydown', function(event){
  if (event.keyCode === 38) {
    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height)
  }
  else if (event.keyCode === 40) {
    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height)
  }
});

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nyanCat.draw();
  requestAnimationFrame(gameLoop);
})
