const chai = require('chai');
const assert = chai.assert;

const Draw = require('../lib/draw');

describe("Draw cat frames", function() {
  context("frame helpers", function() {
    var draw = new Draw();

    it('should check to reset frame time and increase counter', function() {
      var frameCount = draw.checkNewFrame(80, 25);
      assert.equal(frameCount, 1);
    });

    it('should reset frame counter', function() {
      var count = draw.resetFrameCount(12);
      assert.equal(count, 0);
    });
  });
});
