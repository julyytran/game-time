function Helpers() {};

Helpers.prototype.clearObject = function (collection, index) {
  collection.splice(index, 1);
  return collection;
}

Helpers.prototype.addPoints = function (points, addedPoints) {
  points += addedPoints;
  return points;
}

Helpers.prototype.loseHeart = function (hearts, lifeCounter) {
  hearts[lifeCounter].image = document.getElementById("empty-heart");
  lifeCounter++;
  return lifeCounter;
}

Helpers.prototype.checkCollision = function (currentObject, nyanCat) {
  return (nyanCat.x < currentObject.x + currentObject.width && //make these variables
    nyanCat.x + nyanCat.width > currentObject.x &&
    nyanCat.y < currentObject.y + currentObject.height &&
    nyanCat.height + nyanCat.y > currentObject.y);
}

Helpers.prototype.offScreen = function (currentObject) {
  return currentObject.x < -70;
}

Helpers.prototype.determineObject = function(currentObject, lifeCounter, hearts, points){
  if (currentObject.constructor.name === "Sushi"){
     points = this.addPoints(points, 30);
   }
   else if (currentObject.constructor.name === "Trash"){
     lifeCounter = this.checkLoseHeart(lifeCounter, hearts);
   }
  return [lifeCounter, points];
}

Helpers.prototype.checkLoseHeart = function (lifeCounter, hearts) {
  if (lifeCounter < 3) {
    return lifeCounter = this.loseHeart(hearts, lifeCounter);
  };
}

module.exports = Helpers;
