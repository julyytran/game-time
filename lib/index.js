$(document).ready(function(){
  $('#nyan-cat-image').hide()
  $(document).on('keydown', getDirection)
})

var direction = "right"
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var nyanCat = new Cat();

function Cat() {
  this.image = document.getElementById("nyan-cat-image");
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = 10;
  this.context = context;
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  move(this, direction);
  return this;
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nyanCat.draw()
  requestAnimationFrame(gameLoop);
});

function getDirection(key) {
  if (key.keyCode === 40) {
    direction = "up";
  }
  else if (key.keyCode === 38) {
    direction = "down";
  }
};

var move = function(object, direction) {
  if (direction === "down") {
    object.y--;
  } else if (direction === "up") {
    object.y++;
  }
}
