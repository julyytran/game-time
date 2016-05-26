const chai = require('chai');
const assert = chai.assert;

const Sushi = require('../lib/sushi');

describe("Sushi", function() {
  var sushi = new Sushi({context: "test"});
  context("with default attributes", function() {
    it('should assign default values', function() {
      var rowsForSprites = [70, 170, 270, 370];
      assert.equal(sushi.x, 600);
      assert.isAbove(rowsForSprites.indexOf(sushi.y), -1);
      assert.equal(sushi.width, 70);
      assert.equal(sushi.height, 58);
      assert.equal(sushi.context, "test");
    });
  });
  context("within game", function() {
    it('should move left', function() {
      sushi.move(3);
      assert.equal(sushi.x, 597);
    });
  });
});
