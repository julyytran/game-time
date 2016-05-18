function Helpers() {};

Helpers.prototype.clearObject = function (collection, index) {
  collection.splice(index, 1);
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

Helpers.prototype.checkCollision = function (currentSushi, nyanCat) {
  return (nyanCat.x < currentSushi.x + currentSushi.width &&
    nyanCat.x + nyanCat.width > currentSushi.x &&
    nyanCat.y < currentSushi.y + currentSushi.height &&
    nyanCat.height + nyanCat.y > currentSushi.y)
}

Helpers.prototype.checkLoseHeart = function (lifeCounter, hearts, helpers) {
  if (lifeCounter < 3) {
    return lifeCounter = helpers.loseHeart(hearts, lifeCounter);
  };
}

module.exports = Helpers;
