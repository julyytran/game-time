$(document).ready(function(){
  // $(document).on('keyup', getDirection)
})

var direction = "still"
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var nyanCat = new Cat();

function Cat() {
  this.image = document.getElementById("nyan-cat-image");
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = 200;
  this.context = context;
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  var kitty = this
  $(document).on('keyup', function (e){
    getDirection(e.keyCode);
    move(kitty, direction);
  })
  return this;
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nyanCat.draw()
  requestAnimationFrame(gameLoop);
});

function getDirection(keyCode) {
  if (keyCode === 40) {
    direction = "up";
  }
  else if (keyCode === 38) {
    direction = "down";
  }
};

var move = function(object, direction) {
  if (direction === "down") {
    if ((object.y > 10)){
      // object.y = object.y - 50
      object.y = 100
      console.log(object.y)
    }
  } else if (direction === "up") {
    if ((object.y < 400)){
      // object.y = object.y + 50 ;
      object.y = 300
      console.log(object.y)
    }
  }
  else if (direction === "still"){
    console.log("hey")
  }
}
