const chai = require('chai');
const assert = chai.assert;

const Draw = require('../lib/draw');

describe("Draw", function() {

  it('can make a draw object', function() {
    var draw = new Draw();
    assert.equal(draw.constructor.name, "Draw");
  });
  
  context("frame helpers", function() {
    var draw = new Draw();

    it('should check to reset frame time and increase counter', function() {
      var frameCount = draw.checkNewFrame(80, 25);
      assert.equal(frameCount, 1);
    });

    it('should reset frame counter', function() {
      var count = draw.resetFrameCount();
      assert.equal(count, 1);
    });
  });
});
