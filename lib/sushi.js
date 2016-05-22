function Sushi(options) {
  var rowsForSprites = [70, 170, 270, 370];
  var sushiImages = ['egg-roll', 'roe-roll', 'fish-roll'];
  this.image = document.getElementById(sushiImages[Math.floor(Math.random() * sushiImages.length)]);
  this.width = 70;
  this.height = 58;
  this.x = 600;
  this.y = rowsForSprites[Math.floor(Math.random() * rowsForSprites.length)];
  this.context = options.context || {};
}

Sushi.prototype.move = function(speed) {
  this.x -= speed;
  return this;
};

module.exports = Sushi;
