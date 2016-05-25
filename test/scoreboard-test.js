const chai = require('chai');
const assert = chai.assert;

const Scoreboard = require('../lib/scoreboard');

describe("Scoreboard", function() {
  var scoreboard = new Scoreboard();
  it('sorts scores', function() {
    var highest = {name: "Chelsea", points: 100};
    var lowest = {name: "Chelsea", points: 20};
    var middle = {name: "Chelsea", points: 30};
    var scores = [highest, lowest, middle];
    var sortedScores = scoreboard.sortScores(scores);
    assert.equal(sortedScores[0], highest);
    assert.equal(sortedScores[2], lowest);
    assert.equal(sortedScores[1], middle);
  });
  it('saves points', function() {
    var addedPoints = scoreboard.addToScoreboardRecords(60);
    assert.equal(addedPoints[0].points, 60);
    assert.equal(addedPoints[0].username, "unknown user");
  });
  it('add points', function() {
    var score1 = {name: "Chelsea", points: 100};
    var score2 = {name: "Chelsea", points: 20};
    var score3 = {name: "Chelsea", points: 30};
    var undefinedScore;
    var scores = [score1, score2, score3, undefinedScore];
    var addedScores = scoreboard.addScores(scores);
    assert.equal(addedScores.length, 4);
    var checkUndefined = addedScores.indexOf(undefined);
    assert.equal(checkUndefined, -1);
  });
});
