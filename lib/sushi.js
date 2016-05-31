var eggRoll = document.getElementById('egg-roll');
var roeRoll = document.getElementById('roe-roll');
var fishRoll = document.getElementById('fish-roll');
var pictures = [eggRoll, roeRoll, fishRoll];

class Sushi {
  constructor(options) {
    var rowsForSprites = [70, 170, 270, 370];
    this.image = pictures[Math.floor(Math.random() * pictures.length)];
    this.width = 70;
    this.height = 58;
    this.x = 600;
    this.y = rowsForSprites[Math.floor(Math.random() * rowsForSprites.length)];
    this.context = options.context || {};
  }

  move(speed) {
    this.x -= speed;
    return this;
  }
}

module.exports = Sushi;
