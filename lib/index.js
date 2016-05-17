$(document).ready(function(){
  $('#nyan-cat-image').hide()
  // $(document).on('keydown', getDirection)
})

var direction = "still"
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// var nyanCat = new Cat();

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
  // var cat = this
  window.nyanCat = this
  $(document).on('keydown', getDirection)
  // move(this, direction);
  return this;
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var cat = new Cat();
  cat.draw()
  requestAnimationFrame(gameLoop);
});

function getDirection(key) {
  if (key.keyCode === 40) {
    direction = "up";
  }
  else if (key.keyCode === 38) {
    direction = "down";
  }
  move(direction)
};

var move = function(direction) {
  if (direction === "down") {
    if (nyanCat.y > 10){
      nyanCat.y = nyanCat.y - 100
    }
  } else if (direction === "up") {
    if (nyanCat.y < 400){
      nyanCat.y = nyanCat.y + 100 ;
    }
  }
  // if (direction === "down") {
  //   if (object.y > 10){
  //     object.y = object.y - 3
  //   }
  // } else if (direction === "up") {
  //   if (object.y < 400){
  //     object.y = object.y + 3 ;
  //   }
  // }
  else if (direction === "still"){
  }
}
