const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game');
const Heart = require('../lib/heart');
const Cat = require('../lib/cat');

describe("Game", function() {
  var game = new Game();
  context("make object", function() {
    it('should make a new sushi or trash object', function() {
      var newObject = game.makeObject();
      assert.equal(typeof newObject, "object");
    });
  });
  context("increases in difficulty", function() {
    it("should calculate spawn time", function() {
      var gameTimer = 20;
      var actual = game.calculateSpawnTime(-0.05, 0.2, 2.5, gameTimer);
      assert.equal(actual, 1.5);
    });
    it("has cap for spawn time", function() {
      var gameTimer = 500;
      var actual = game.calculateSpawnTime(-0.05, 0.2, 2.5, gameTimer);
      assert.equal(actual, 0.2);
    });
    it("should calculate speed", function() {
      var gameTimer = 14;
      var actual = game.calculateSpeed(0.07, 3, 10, gameTimer);
      assert.equal(actual, 3.98);
    });
    it("has cap for speed", function() {
      var gameTimer = 500;
      var actual = game.calculateSpeed(0.07, 3, 10, gameTimer);
      assert.equal(actual, 10);
    });
    it("resets game variables", function() {
      var heart1 = new Heart(500, {context: "test"});
      var heart2 = new Heart(550, {context: "test"});
      var heart3 = new Heart(600, {context: "test"});
      var hearts = [heart1, heart2, heart3];
      var variables = game.resetGame(hearts);
      assert.equal(variables[0], 0);
      assert.equal(variables[1].length, 0);
    });
    it("resets points", function() {
      var points = game.resetPoints();
      assert.equal(points, 0);
    });
    it("moves cat down", function() {
      var cat = new Cat({context: "test"});
      var event = { keyCode: 40 };
      assert.equal(cat.y, 70);
      var newCat = game.moveCat(event, cat);
      assert.equal(newCat.y, 170);
    });
    it("moves cat up", function() {
      var cat = new Cat({context: "test"});
      cat.y = 170;
      var event = { keyCode: 38 };
      var newCat = game.moveCat(event, cat);
      assert.equal(newCat.y, 70);
    });
    it("doesn't move cat if not up or down", function() {
      var cat = new Cat({context: "test"});
      assert.equal(cat.y, 70);
      var event = { keyCode: 10 };
      var newCat = game.moveCat(event, cat);
      assert.equal(newCat.y, 70);
    });
  });
});
