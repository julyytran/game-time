function Heart(x, options) {
  this.image = document.getElementById("full-heart");
  this.width = 60;
  this.height = 60;
  this.x = x;
  this.y = 10;
  this.context = options.context || {};
}

Heart.prototype.draw = function() {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

module.exports = Heart;
