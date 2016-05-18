const chai = require('chai');
const assert = chai.assert;

const Cat = require('../lib/cat');

describe("Cat", function(){
  context("with default attributes", function() {
    var cat = new Cat({context: "test"});

    it('should assign default values', function() {
      assert.equal(cat.x, 10);
      assert.equal(cat.y, 50);
      assert.equal(cat.width, 100);
      assert.equal(cat.height, 100);
      assert.equal(cat.context, "test");
    });
  });
});
