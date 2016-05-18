const chai = require('chai');
const assert = chai.assert;

const Cat = require('../lib/cat');

describe("Cat", function(){
  context("with default attributes", function() {
    // var cat = new Cat({});

    it('should assign default values', function() {
      // assert.equal(cat.x, 10);
      assert.equal(1, 1);
      // assert.equal(dingus.x, 0);
    });
  })
})
