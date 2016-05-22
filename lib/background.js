function Background(options) {}

Background.prototype.randomStarsImage = function(starfieldCtx, canvas, starfield){
  starfieldCtx.beginPath();
  starfieldCtx.fillStyle = "#003466";
  starfieldCtx.rect(0, 0, starfield.width, starfield.height);
  starfieldCtx.fill();
  starfieldCtx.beginPath();
  for(var n = 0 ; n < 100; n++){
      var x = parseInt(Math.random() * canvas.width);
      var y = parseInt(Math.random() * canvas.height);
      var radius = Math.random() * 3;
      starfieldCtx.arc(x, y, radius, 0, Math.PI * 2,false);
      starfieldCtx.closePath();
  }
  starfieldCtx.fillStyle = "white";
  starfieldCtx.fill();

  // create an new image using the starfield canvas
  var img = document.createElement("img");
  img.src = starfield.toDataURL();
  return img
}

Background.prototype.clearCanvas = function(starfieldCtx, starfield){
  starfieldCtx.clearRect(0, 0, starfield.width, starfield.height);
}

Background.prototype.draw = function(starfieldCtx, backgroundImage, offsetLeft){
  starfieldCtx.drawImage(backgroundImage, -offsetLeft, 0);
  starfieldCtx.drawImage(backgroundImage, backgroundImage.width - offsetLeft, 0);
}

module.exports = Background;
