const chai = require('chai');
const assert = chai.assert;

const Boom = require('../lib/boom');

describe("Boom", function() {
  context("with default attributes", function() {
    var boom = new Boom({context: "test"});

    it('should assign default values', function() {
      assert.equal(boom.x, 140);
      assert.equal(boom.y, 100);
      assert.equal(boom.width, 422);
      assert.equal(boom.height, 362);
      assert.equal(boom.context, "test");
    });
  });
});
