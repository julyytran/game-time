const chai = require('chai');
const assert = chai.assert;

const Heart = require('../lib/heart');

describe("Heart", function(){
  context("with default attributes", function() {
    var heart = new Heart(10, {context: "test"});

    it('should assign default values', function() {
      assert.equal(heart.x, 10);
      assert.equal(heart.y, 10);
      assert.equal(heart.width, 60);
      assert.equal(heart.height, 60);
      assert.equal(heart.context, "test");
    });
  });
});
