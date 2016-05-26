var catDrawMinY = 70;
var catDrawMaxY = 370;

function Cat(options) {
  this.width = 140;
  this.height = 55;
  this.x = 0;
  this.y = 70;
  this.context = options.context || {};
}

Cat.prototype.moveUp = function () {
  this.y = Math.max(catDrawMinY, this.y - 100);
};

Cat.prototype.moveDown = function () {
  this.y = Math.min(catDrawMaxY, this.y + 100);
};

module.exports = Cat;
