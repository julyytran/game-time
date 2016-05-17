$(document).ready(function(){
})

var direction = "still";
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var nyanCat = new Cat();

function Cat() {
  this.image = document.getElementById("nyan-cat-image");
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = 50;
  this.context = context;
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  var kitty = this;
  $(document).on('keyup', function (e){
    getDirection(e);
    move(kitty, direction);
  });
  return this;
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nyanCat.draw();
  requestAnimationFrame(gameLoop);
})

function getDirection(key) {
  if (key.keyCode === 38) {
    direction = "up";
  }
  else if (key.keyCode === 40) {
    direction = "down";
  }
}

var moveDown = {
  50: 150,
  150: 250,
  250: 350,
  350: 350
}

var moveUp = {
  50: 50,
  150: 50,
  250: 150,
  350: 250
}

var move = function(object, direction) {
  if (direction === "down") {
    object.y = moveDown[object.y]
    console.log(object.y)
  } else if (direction === "up") {
    object.y = moveUp[object.y]
    console.log(object.y)
  }
  else if (direction === "still"){
    console.log("hey")
  }
}
