class Background {
  constructor(options) {
    this.starfield = options.starfield;
    this.starfieldCtx = options.starfieldCtx;
    this.canvas = options.canvas;
  }

  randomStarsImage() {
    this.getStars();

    let img = document.createElement("img");
    img.src = this.starfield.toDataURL();
    return img;
  }

  getStars() {
    this.starfieldCtx.beginPath();
    for(let n = 0 ; n < 100; n++){
      let coordinates = this.getStarCoordinates();
      let x = coordinates.x;
      let y = coordinates.y;
      let radius = coordinates.radius;
      this.starfieldCtx.arc(x, y, radius, 0, Math.PI * 2,false);
      this.starfieldCtx.closePath();
    }
    this.starfieldCtx.fillStyle = "white";
    this.starfieldCtx.fill();
  }

  getStarCoordinates() {
    let x = parseInt(Math.random() * this.canvas.width);
    let y = parseInt(Math.random() * this.canvas.height);
    let radius = Math.random() * 3;
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
