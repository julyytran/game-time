function Background(options) {
  this.starfield = options.starfield;
  this.starfieldCtx = options.starfieldCtx;
  this.canvas = options.canvas;
}

Background.prototype.randomStarsImage = function(starfieldCtx, canvas, starfield){
  this.getStars();

  var img = document.createElement("img");
  img.src = this.starfield.toDataURL();
  return img;
}

Background.prototype.getStars = function(){
  this.starfieldCtx.beginPath();
  for(var n = 0 ; n < 100; n++){
      var coordinates = this.getStarCoordinates();
      var x = coordinates.x;
      var y = coordinates.y;
      var radius = coordinates.radius;
      this.starfieldCtx.arc(x, y, radius, 0, Math.PI * 2,false);
      this.starfieldCtx.closePath();
  }
  this.starfieldCtx.fillStyle = "white";
  this.starfieldCtx.fill();
}

Background.prototype.getStarCoordinates = function(){
  var x = parseInt(Math.random() * this.canvas.width);
  var y = parseInt(Math.random() * this.canvas.height);
  var radius = Math.random() * 3;
  return { x: x, y: y, radius: radius }
}

Background.prototype.clearCanvas = function(){
  this.starfieldCtx.clearRect(0, 0, this.starfield.width, this.starfield.height);
}

Background.prototype.draw = function(backgroundImage, offsetLeft){
  this.starfieldCtx.drawImage(backgroundImage, -offsetLeft, 0);
  this.starfieldCtx.drawImage(backgroundImage, backgroundImage.width - offsetLeft, 0);
}

module.exports = Background;
