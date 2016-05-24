const chai = require('chai');
const assert = chai.assert;

const Scoreboard = require('../lib/scoreboard');

describe("Scoreboard", function() {
  var scoreboard = new Scoreboard();
  it('sorts scores', function() {
    var highest = {name: "Chelsea", points: 100}
    var lowest = {name: "Chelsea", points: 20}
    var middle = {name: "Chelsea", points: 30}
    var scores = [highest, lowest, middle]
    var sortedScores = scoreboard.sortScores(scores)
    assert.equal(sortedScores[0], highest);
    assert.equal(sortedScores[2], lowest);
    assert.equal(sortedScores[1], middle);
  });
});
