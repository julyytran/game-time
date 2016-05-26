const chai = require('chai');
const assert = chai.assert;

const Scoreboard = require('../lib/scoreboard');

describe("Scoreboard", function() {
  
  it('can make a scoreboard', function() {
    var scoreboard = new Scoreboard();
    assert.equal(scoreboard.constructor.name, "Scoreboard");
  });
});
