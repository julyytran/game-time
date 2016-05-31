let eggRoll = document.getElementById('egg-roll');
let roeRoll = document.getElementById('roe-roll');
let fishRoll = document.getElementById('fish-roll');
let pictures = [eggRoll, roeRoll, fishRoll];

class Sushi {
  constructor(options) {
    let rowsForSprites = [70, 170, 270, 370];
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
