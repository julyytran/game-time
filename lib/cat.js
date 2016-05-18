function Cat(options){
  this.image = document.getElementById("nyan-cat-image") || "images/nyan-cat";
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = 50;
  this.context = options.context || {};
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

function moveCat(){
  if (event.keyCode === 38) {
    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height);
  }
  else if (event.keyCode === 40) {
    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height);
  }
};

module.exports = Cat;
