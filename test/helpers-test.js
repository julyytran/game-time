const chai = require('chai');
const assert = chai.assert;

const Helpers = require('../lib/helpers');
const Cat = require('../lib/cat');
const Sushi = require('../lib/sushi');
const Trash = require('../lib/trash');
const Heart = require('../lib/heart');

describe("Helpers", function() {
  var helpers = new Helpers();

  it("should remove objects from array", function() {
    var sushis = [1, 2, 3, 4];
    var result = helpers.clearObject(sushis, 1);
    var expected = [1, 3, 4];
    assert.equal(result[1], expected[1]);
  });

  it("should increase lifeCounter and change heart image", function() {
    var heart1 = new Heart(500, {context: "test"});
    var heart2 = new Heart(550, {context: "test"});
    var heart3 = new Heart(600, {context: "test"});
    var hearts = [heart1, heart2, heart3];
    var lifeCounter = 0;
    $('canvas').attr('id', 'game');

    var returnedLifeCounter = helpers.loseHeart(hearts, lifeCounter);
    assert.equal(returnedLifeCounter, 1);
  });

  context("collision detection", function() {
    it('should return true if objects overlap', function() {
      var cat = new Cat({context: "test"});
      var sushi = new Sushi({context: "test"});
      var initial = helpers.checkCollision(sushi, cat);
      assert.equal(initial, false);
      cat.x = 50;
      cat.y = 50;
      sushi.y = 50;
      sushi.x = 50;
      var expected = helpers.checkCollision(sushi, cat);
      assert.equal(expected, true);
    });

    it('should return false if values do not overlap', function() {
      var cat = new Cat({context: "test"});
      var sushi = new Sushi({context: "test"});
      var expected = helpers.checkCollision(sushi, cat);
      assert.equal(expected, false);
    });

    it('should add points and return new points', function() {
      var points = helpers.addPoints(0, 30);
      assert.equal(points, 30);
    });

    it('should check if player should lose heart', function() {
      var heart1 = new Heart(500, {context: "test"});
      var heart2 = new Heart(550, {context: "test"});
      var heart3 = new Heart(600, {context: "test"});
      var hearts = [heart1, heart2, heart3];
      var lifeCounter = 0;

      var actual = helpers.checkLoseHeart(lifeCounter, hearts);
      assert.equal(actual, 1);
    });

    it('should check if player should lose heart if lifeCounter is > 3', function() {
      var heart1 = new Heart(500, {context: "test"});
      var heart2 = new Heart(550, {context: "test"});
      var heart3 = new Heart(600, {context: "test"});
      var hearts = [heart1, heart2, heart3];
      var lifeCounter = 4;

      var actual = helpers.checkLoseHeart(lifeCounter, hearts);
      assert.equal(actual, undefined);
    });

    it('determines object and return lifeCounter and points-hits trash', function() {
      var heart1 = new Heart(500, {context: "test"});
      var heart2 = new Heart(550, {context: "test"});
      var heart3 = new Heart(600, {context: "test"});
      var hearts = [heart1, heart2, heart3];
      var trash = new Trash({context: "test"});
      var points = 0;
      var lifeCounter = 0;

      var actual = helpers.determineObject(trash, lifeCounter, hearts, points);
      assert.equal(actual[0], 1);
      assert.equal(actual[1], 0);
    });

    it('determines object and return lifeCounter and points-hits sushi', function() {
      var heart1 = new Heart(500, {context: "test"});
      var heart2 = new Heart(550, {context: "test"});
      var heart3 = new Heart(600, {context: "test"});
      var hearts = [heart1, heart2, heart3];
      var sushi = new Sushi({context: "test"});
      var points = 0;
      var lifeCounter = 0;

      var actual = helpers.determineObject(sushi, lifeCounter, hearts, points);
      assert.equal(actual[0], 0);
      assert.equal(actual[1], 30);
    });

    it('determines if the object went offscreen', function() {
      var sushi = new Sushi({context: "test"});
      sushi.x = 10;
      var onScreen = helpers.offScreen(sushi);
      assert.equal(onScreen, false);
      sushi.x = -100;
      var offScreen = helpers.offScreen(sushi);
      assert.equal(offScreen, true);
    });
  });
});
