const chai = require('chai');
const assert = chai.assert;

const Cat = require('../lib/cat');

describe("Cat", function() {
  var cat = new Cat({context: "test"});
  context("with default attributes", function() {
    it('should assign default values', function() {
      assert.equal(cat.x, 0);
      assert.equal(cat.y, 70);
      assert.equal(cat.width, 140);
      assert.equal(cat.height, 55);
      assert.equal(cat.context, "test");
    });
  });
  context("within game", function() {
    it('should decrease y when moving up', function() {
      cat.y = 150;
      cat.moveUp();
      assert.equal(cat.y, 70);
    });

    it('should increase y when moving down', function() {
      assert.equal(cat.y, 70);
      cat.moveDown();
      assert.equal(cat.y, 170);
    });
    it('cannnot move above 70', function() {
      cat.y = 70;
      cat.moveUp();
      assert.equal(cat.y, 70);
    });
    it('cannot move below 370', function() {
      cat.y = 370;
      cat.moveDown();
      assert.equal(cat.y, 370);
    });
  });
});
