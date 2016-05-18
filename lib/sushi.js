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

Sushi.prototype.draw = function() {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

Sushi.prototype.move = function(sushis, index) {
  this.x -= 3;
  if (this.x < - 70){
    clearObject(sushis, index);
  }
  return this;
}

function clearObject(collection, index){
  collection.splice(index, 1);
}

module.exports = Sushi;
