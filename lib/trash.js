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

Trash.prototype.move = function(speed) {
  this.x -= speed;
  return this;
}

module.exports = Trash;
