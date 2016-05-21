const Helpers = require('./helpers');
var helpers = new Helpers();

function Trash(options) {
  var rowsForTrash = [70, 170, 270, 370];
  var trashImages = ['kawaii-poop', 'kawaii-toaster'];
  this.image = document.getElementById(trashImages[Math.floor(Math.random() * trashImages.length)]);
  this.width = 70;
  this.height = 58;
  this.x = 600;
  this.y = rowsForTrash[Math.floor(Math.random() * rowsForTrash.length)];
  this.context = options.context || {};;
}

Trash.prototype.move = function(trashes, index, speed) {
  this.x -= speed;
  // if (this.x < - 70){
  //   helpers.clearObject(trashes, index);
  // }
  return this;
}

module.exports = Trash;
