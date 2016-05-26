const chai = require('chai');
const assert = chai.assert;

const Bomb = require('../lib/bomb');

describe("Bomb", function() {
  context("with default attributes", function() {
    var bomb = new Bomb(10, {context: "test"});

    it('should assign default values', function() {
      assert.equal(bomb.x, 10);
      assert.equal(bomb.y, 8);
      assert.equal(bomb.width, 50);
      assert.equal(bomb.height, 50);
      assert.equal(bomb.context, "test");
    });
  });
});
