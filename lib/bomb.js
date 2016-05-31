class Bomb {
  constructor (x, options) {
    this.image = document.getElementById("bomb");
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = 8;
    this.context = options.context || {};
  }
}

module.exports = Bomb;
