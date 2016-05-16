$(document).ready(function(){
  $('#nyan-cat-image').hide()
})

var direction = "right"

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// var nyanCat = new Cat();

// function Cat(x, y, width, height, context) {
//   this.image = document.getElementById("nyan-cat-image");
//   context.drawImage(this.image, 10, 10)
  // this.x = x;
  // this.y = y;
  // this.width = width;
  // this.height = height;
  // this.context = context;
// }

// Cat.prototype.draw = function () {
//   this.context.drawImage(nyanCat, 10, 10);;
  // this.context.fillRect(this.x, this.y, this.width, this.height);
  // move(this, direction);
  // return this;
// }

// var nyanCat = new Cat(50, 50, 10, 10, context);
// var firstBlock = new Block(50, 50, 10, 10, context);

var nyanCat = document.getElementById("nyan-cat-image");

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
  context.drawImage(nyanCat, 10, 10);
  // nyanCat.draw()
  requestAnimationFrame(gameLoop);
});
//
// $(document).on('keydown', function(key) {
//   if (key.keyCode === 39) {
//     direction = "right";
//   } else if (key.keyCode === 40) {
//     direction = "up";
//   } else if (key.keyCode === 37) {
//     direction = "left";
//   } else if (key.keyCode === 38) {
//     direction = "down";
//   }
// });
//
// var move = function(object, direction) {
//   if (direction === "right") {
//     object.x++;
//   } else if (direction === "left") {
//     object.x--;
//   } else if (direction === "down") {
//     object.y--;
//   } else if (direction === "up") {
//     object.y++;
//   }
// }
