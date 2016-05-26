const chai = require('chai');
const assert = chai.assert;

const Draw = require('../lib/draw');

describe("Draw", function() {
  it('can make a draw object', function() {
    var draw = new Draw();
    assert.equal(draw.constructor.name, "Draw");
  });
});
