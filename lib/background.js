class Background {
  constructor(options) {
    this.starfield = options.starfield;
    this.starfieldCtx = options.starfieldCtx;
    this.canvas = options.canvas;
  }

  randomStarsImage() {
    this.getStars();

    var img = document.createElement("img");
    img.src = this.starfield.toDataURL();
    return img;
  }

  getStars() {
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

  getStarCoordinates() {
    var x = parseInt(Math.random() * this.canvas.width);
    var y = parseInt(Math.random() * this.canvas.height);
    var radius = Math.random() * 3;
    return { x: x, y: y, radius: radius };
  }

  clearCanvas() {
    this.starfieldCtx.clearRect(0, 0, this.starfield.width, this.starfield.height);
  }

  draw(backgroundImage, offsetLeft) {
    this.starfieldCtx.drawImage(backgroundImage, -offsetLeft, 0);
    this.starfieldCtx.drawImage(backgroundImage, backgroundImage.width - offsetLeft, 0);
  }
}

module.exports = Background;
