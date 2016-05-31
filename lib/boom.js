class Boom {
  constructor (options) {
    this.image = document.getElementById("boom");
    this.width = 422;
    this.height = 362;
    this.x = 140;
    this.y = 100;
    this.context = options.context || {};
  }
}

module.exports = Boom;
