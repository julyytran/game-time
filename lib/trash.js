let poop = document.getElementById('kawaii-poop');
let toaster = document.getElementById('kawaii-toaster');
let pictures = [poop, toaster];

class Trash {
  constructor(options) {
    let rowsForTrash = [70, 170, 270, 370, 70, 270, 370];
    this.image = pictures[Math.floor(Math.random() * pictures.length)];
    this.width = 70;
    this.height = 58;
    this.x = 600;
    this.y = rowsForTrash[Math.floor(Math.random() * rowsForTrash.length)];
    this.context = options.context || {};
  }

  move(speed) {
    this.x -= speed;
    return this;
  }
}

module.exports = Trash;
