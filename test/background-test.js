const chai = require('chai');
const assert = chai.assert;

const Background = require('../lib/background');

describe("Background", function() {
  var background = new Background({starfield: "test", starfieldCtx: "test", canvas: "test"});
  it('should assign default values', function() {
    assert.equal(background.starfield, "test");
    assert.equal(background.starfieldCtx, "test");
    assert.equal(background.canvas, "test");
  });
  it('gets coordinates for stars', function() {
    var coordinates = background.getStarCoordinates();
    assert.equal(typeof coordinates.x, "number")
    assert.equal(typeof coordinates.y, "number")
    assert.equal(typeof coordinates.radius, "number")
  });
});
