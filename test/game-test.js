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
      var gameTimer = 3;
      var actual = game.calculateSpawnTime(gameTimer);
      assert.equal(actual, 1);
    });
    it("has cap for spawn time", function() {
      var gameTimer = 10;
      var actual = game.calculateSpawnTime(gameTimer);
      assert.equal(actual, 0.4);
    });
    it("should calculate speed", function() {
      var time = 1463697612806
      var actual = game.calculateSpeed(time);
      assert.equal(actual, 4)
    });
  });
});
