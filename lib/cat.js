var catDrawMinY = 50;
var catDrawMaxY = 350;

function Cat(options) {
  this.image = document.getElementById("nyan-cat-image");
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = 50;
  this.context = options.context || {};
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

Cat.prototype.moveUp = function () {
  this.y = Math.max(catDrawMinY, this.y - this.height);
}

Cat.prototype.moveDown = function () {
  this.y = Math.min(catDrawMaxY, this.y + this.height);
}

module.exports = Cat;
