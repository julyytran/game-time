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

Trash.prototype.draw = function() {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

Trash.prototype.move = function(trashes, index) {
  this.x -= 3;
  if (this.x < - 70){
    clearObject(trashes, index);
  }
  return this;
}

function clearObject(collection, index){
  collection.splice(index, 1);
}

module.exports = Trash;
