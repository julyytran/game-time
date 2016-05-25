var poop = document.getElementById('kawaii-poop')
var toaster = document.getElementById('kawaii-toaster')
var pictures = [poop, toaster]

function Trash(options) {
  var rowsForTrash = [70, 170, 270, 370];
  this.image = pictures[Math.floor(Math.random() * pictures.length)];
  this.width = 70;
  this.height = 58;
  this.x = 600;
  this.y = rowsForTrash[Math.floor(Math.random() * rowsForTrash.length)];
  this.context = options.context || {};
}

Trash.prototype.move = function(speed) {
  this.x -= speed;
  return this;
};

module.exports = Trash;
