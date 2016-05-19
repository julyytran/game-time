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
  return (nyanCat.x < currentObject.x + currentObject.width &&
    nyanCat.x + nyanCat.width > currentObject.x &&
    nyanCat.y < currentObject.y + currentObject.height &&
    nyanCat.height + nyanCat.y > currentObject.y);
}

Helpers.prototype.checkLoseHeart = function (lifeCounter, hearts, helpers) {
  if (lifeCounter < 3) {
    return lifeCounter = helpers.loseHeart(hearts, lifeCounter);
  };
}

module.exports = Helpers;
