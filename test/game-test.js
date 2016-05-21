const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game');

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
      var gameTimer = 14
      var actual = game.calculateSpeed(0.07, 3, 10, gameTimer);
      assert.equal(actual, 3.98)
    });
    it("has cap for speed", function() {
      var gameTimer = 500
      var actual = game.calculateSpeed(0.07, 3, 10, gameTimer);
      assert.equal(actual, 10)
    });
  });
});
