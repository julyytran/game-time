let catDrawMinY = 70;
let catDrawMaxY = 370;

class Cat {
  constructor(options) {
    this.width = 140;
    this.height = 55;
    this.x = 0;
    this.y = 70;
    this.context = options.context || {};
  }

  moveUp() {
    this.y = Math.max(catDrawMinY, this.y - 100);
  }

  moveDown() {
    this.y = Math.min(catDrawMaxY, this.y + 100);
  }
}

module.exports = Cat;
