function Background(options) {
  this.starfield = options.starfield;
  this.starfieldCtx = options.starfieldCtx;
  this.canvas = options.canvas;
}

Background.prototype.randomStarsImage = function(starfieldCtx, canvas, starfield){
  this.starfieldCtx.beginPath();
  this.starfieldCtx.fillStyle = "#003466";
  this.starfieldCtx.rect(0, 0, this.starfield.width, this.starfield.height);
  this.starfieldCtx.fill();
  this.starfieldCtx.beginPath();
  for(var n = 0 ; n < 100; n++){
      var x = parseInt(Math.random() * this.canvas.width);
      var y = parseInt(Math.random() * this.canvas.height);
      var radius = Math.random() * 3;
      this.starfieldCtx.arc(x, y, radius, 0, Math.PI * 2,false);
      this.starfieldCtx.closePath();
  }
  this.starfieldCtx.fillStyle = "white";
  this.starfieldCtx.fill();

  var img = document.createElement("img");
  img.src = this.starfield.toDataURL();
  return img
}

Background.prototype.clearCanvas = function(){
  this.starfieldCtx.clearRect(0, 0, this.starfield.width, this.starfield.height);
}

Background.prototype.draw = function(backgroundImage, offsetLeft){
  this.starfieldCtx.drawImage(backgroundImage, -offsetLeft, 0);
  this.starfieldCtx.drawImage(backgroundImage, backgroundImage.width - offsetLeft, 0);
}
// function Background(options) {}
//
// Background.prototype.randomStarsImage = function(starfieldCtx, canvas, starfield){
//   starfieldCtx.beginPath();
//   starfieldCtx.fillStyle = "#003466";
//   starfieldCtx.rect(0, 0, starfield.width, starfield.height);
//   starfieldCtx.fill();
//   starfieldCtx.beginPath();
//   for(var n = 0 ; n < 100; n++){
//       var x = parseInt(Math.random() * canvas.width);
//       var y = parseInt(Math.random() * canvas.height);
//       var radius = Math.random() * 3;
//       starfieldCtx.arc(x, y, radius, 0, Math.PI * 2,false);
//       starfieldCtx.closePath();
//   }
//   starfieldCtx.fillStyle = "white";
//   starfieldCtx.fill();
//
//   var img = document.createElement("img");
//   img.src = starfield.toDataURL();
//   return img
// }
//
// Background.prototype.clearCanvas = function(starfieldCtx, starfield){
//   starfieldCtx.clearRect(0, 0, starfield.width, starfield.height);
// }
//
// Background.prototype.draw = function(starfieldCtx, backgroundImage, offsetLeft){
//   starfieldCtx.drawImage(backgroundImage, -offsetLeft, 0);
//   starfieldCtx.drawImage(backgroundImage, backgroundImage.width - offsetLeft, 0);
// }

module.exports = Background;
