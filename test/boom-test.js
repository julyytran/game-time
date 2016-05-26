const chai = require('chai');
const assert = chai.assert;

const Boom = require('../lib/boom');

describe("Boom", function() {
  context("with default attributes", function() {
    var boom = new Boom({context: "test"});

    it('should assign default values', function() {
      assert.equal(boom.x, 120);
      assert.equal(boom.y, 120);
      assert.equal(boom.width, 400);
      assert.equal(boom.height, 310);
      assert.equal(boom.context, "test");
    });
  });
});
