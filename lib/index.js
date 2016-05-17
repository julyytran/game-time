$(document).ready(function(){
})

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var catDrawMinY = 50;
var catDrawMaxY = 350;
var nyanCat = new Cat();
var lastGenTime = 0;
var points = 0;

function Cat() {
  this.image = document.getElementById("nyan-cat-image");
  this.width = 100;
  this.height = 100;
  this.x = 10;
  this.y = catDrawMinY;
  this.context = context;
}

Cat.prototype.draw = function () {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

$(document).on('keydown', function(event){
  if (event.keyCode === 38) {
    nyanCat.y = Math.max(catDrawMinY, nyanCat.y - nyanCat.height)
  }
  else if (event.keyCode === 40) {
    nyanCat.y = Math.min(catDrawMaxY, nyanCat.y + nyanCat.height)
  }
});

function Sushi(){
  var rowsForSprites = [70, 170, 270, 370]
  var sushiImages = ['egg-roll', 'roe-roll', 'fish-roll']
  this.image = document.getElementById(sushiImages[Math.floor(Math.random() * sushiImages.length)]);
  this.width = 70;
  this.height = 58;
  this.x = 600;
  this.y = rowsForSprites[Math.floor(Math.random() * rowsForSprites.length)];
  this.context = context;
}

function Trash(){
  var rowsForTrash = [70, 170, 270, 370]
  var trashImages = ['kawaii-poop', 'kawaii-toaster']
  this.image = document.getElementById(trashImages[Math.floor(Math.random() * trashImages.length)]);
  this.width = 70;
  this.height = 58;
  this.x = 600;
  this.y = rowsForTrash[Math.floor(Math.random() * rowsForTrash.length)];
  this.context = context;
}

Sushi.prototype.draw = function() {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

Sushi.prototype.move = function(sushis, index) {
  this.x -= 3;
  if (this.x < - 70){
    clearObject(sushis, index)
  }
  return this;
}

var sushis = []

Trash.prototype.draw = function() {
  this.context.drawImage(this.image, this.x, this.y);
  return this;
}

Trash.prototype.move = function(trashes, index) {
  this.x -= 3;
  if (this.x < - 70){
    clearObject(trashes, index)
  }
  return this;
}

var trashes = []

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nyanCat.draw();

  context.font="30px Comic Sans MS";
  context.fillStyle= "magenta";
  context.fillText("Points: " + points, 20, 40);

  var now = Date.now();
  var elapsed = (now - lastGenTime) / 1000;

  if (elapsed > 1){
    lastGenTime = now;
    var sushi = new Sushi();
    sushis.push(sushi);
    var trash = new Trash();
    trashes.push(trash);
  }

  for (var i = 0; i < sushis.length; i++){
    var currentSushi = sushis[i]
    currentSushi.draw();
    currentSushi.move(sushis, i);
    if (nyanCat.x < currentSushi.x + currentSushi.width &&
     nyanCat.x + nyanCat.width > currentSushi.x &&
     nyanCat.y < currentSushi.y + currentSushi.height &&
     nyanCat.height + nyanCat.y > currentSushi.y) {
       clearObject(sushis, i)
       addPoints(30)
    }
  }

  for (var i = 0; i < trashes.length; i++){
    var currentTrash = trashes[i]
    currentTrash.draw();
    currentTrash.move(trashes, i);
    if (nyanCat.x < currentTrash.x + currentTrash.width &&
     nyanCat.x + nyanCat.width > currentTrash.x &&
     nyanCat.y < currentTrash.y + currentTrash.height &&
     nyanCat.height + nyanCat.y > currentTrash.y) {
       clearObject(trashes, i)
      //  addPoints(30) change to take life away
    }
  }

  requestAnimationFrame(gameLoop);
})

function addPoints(addedPoints){
  points += addedPoints
}

function clearObject(collection, index){
  collection.splice(index, 1)
}
