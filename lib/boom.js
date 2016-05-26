function Boom(options) {
  this.image = document.getElementById("boom");
  this.width = 400;
  this.height = 310;
  this.x = 120;
  this.y = 120;
  this.context = options.context || {};
}

module.exports = Boom;
