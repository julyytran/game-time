var catDrawMinY = 50;
var catDrawMaxY = 350;
// var nyan1 = document.getElementById('nyan-1');
// var nyan2 = document.getElementById('nyan-2');
// var nyan3 = document.getElementById('nyan-3');
// var nyan4 = document.getElementById('nyan-4');
// var nyan5 = document.getElementById('nyan-5');
// var nyan6 = document.getElementById('nyan-6');
// var nyan7 = document.getElementById('nyan-7');
// var nyan8 = document.getElementById('nyan-8');
// var nyan9 = document.getElementById('nyan-9');
// var nyan10 = document.getElementById('nyan-10');
// var nyan11 = document.getElementById('nyan-11');
// var nyan12 = document.getElementById('nyan-12');
// var nyanFrames = [nyan1, nyan2, nyan3, nyan4, nyan5, nyan6, nyan7, nyan8, nyan9, nyan10, nyan11, nyan12];
// var frameCount = 0;

function Cat(options) {
  // this.image = document.getElementById("nyan-cat-image");
  // this.image = nyanFrames[frameCount];
  // frameCount++;
  // if (frameCount === 12) {
  //   frameCount = 0;
  // }
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = 50;
  this.context = options.context || {};
}

Cat.prototype.moveUp = function () {
  this.y = Math.max(catDrawMinY, this.y - this.height);
};

Cat.prototype.moveDown = function () {
  this.y = Math.min(catDrawMaxY, this.y + this.height);
};

module.exports = Cat;
