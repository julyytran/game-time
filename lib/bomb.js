function Bomb(x, options) {
  this.image = document.getElementById("bomb");
  this.width = 60;
  this.height = 60;
  this.x = x;
  this.y = 8;
  this.context = options.context || {};
}

module.exports = Bomb;
