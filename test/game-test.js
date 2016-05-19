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
});
