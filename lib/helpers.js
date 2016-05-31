var meow = document.getElementById("cat-meow");
var ding = document.getElementById("ding");

class Helpers {
  constructor() {}

  addPoints(points, addedPoints) {
    points += addedPoints;
    return points;
  }

  loseHeart(hearts, lifeCounter) {
    hearts[lifeCounter].image = document.getElementById("empty-heart");
    document.getElementById("starfield").style.background ='rgba(255, 0, 0, 0.5)';
    lifeCounter++;
    return lifeCounter;
  }

  checkCollision(currentObject, nyanCat) {
    var nyanCatStartX = nyanCat.x + (nyanCat.width / 2);
    var nyanCatStartY = nyanCat.y;
    var nyanCatLength = nyanCatStartX + (nyanCat.width - 70);
    var nyanCatHeight = nyanCatStartY + nyanCat.height;

    var objectStartX = currentObject.x;
    var objectStartY = currentObject.y;
    var objectLength = currentObject.x + currentObject.width;
    var objectHeight = currentObject.y + currentObject.height;

    return (
      nyanCatStartX < objectLength &&
      nyanCatLength > objectStartX &&
      nyanCatStartY < objectHeight &&
      nyanCatHeight > objectStartY
    );
  }

  offScreen(currentObject) {
    return currentObject.x < -70;
  }

  determineObject(currentObject, lifeCounter, hearts, points) {
    if (currentObject.constructor.name === "Sushi"){
      points = this.addPoints(points, 30);
      this.playCollisionSound(ding);
    }
    else if (currentObject.constructor.name === "Trash"){
      lifeCounter = this.checkLoseHeart(lifeCounter, hearts);
      this.playCollisionSound(meow);
    }
    return [lifeCounter, points];
  }

  playCollisionSound(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    }
  }

  checkLoseHeart(lifeCounter, hearts) {
    if (lifeCounter < 3) {
      return lifeCounter = this.loseHeart(hearts, lifeCounter);
    }
  }
}

module.exports = Helpers;
