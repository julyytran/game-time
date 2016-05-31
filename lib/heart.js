class Heart {
  constructor(x, options) {
    this.image = document.getElementById("full-heart");
    this.width = 60;
    this.height = 60;
    this.x = x;
    this.y = 10;
    this.context = options.context || {};
  }
}

module.exports = Heart;
