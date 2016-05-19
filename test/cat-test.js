const chai = require('chai');
const assert = chai.assert;

const Cat = require('../lib/cat');

describe("Cat", function() {
  var cat = new Cat({context: "test"});
  context("with default attributes", function() {
    it('should assign default values', function() {
      assert.equal(cat.x, 10);
      assert.equal(cat.y, 50);
      assert.equal(cat.width, 100);
      assert.equal(cat.height, 100);
      assert.equal(cat.context, "test");
    });
  });
  context("within game", function() {
    it('should decrease y when moving up', function() {
      cat.y = 150;
      cat.moveUp();
      assert.equal(cat.y, 50);
    });

    it('should increase y when moving down', function() {
      assert.equal(cat.y, 50);
      cat.moveDown();
      assert.equal(cat.y, 150);
    });
  });
});
