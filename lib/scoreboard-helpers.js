function ScoreboardHelpers() {}

ScoreboardHelpers.prototype.addToScoreboardRecords = function(scoreboardRecords, points) {
  var username = validateInput();
  scoreboardRecords.push({username: username, points: points});
  return scoreboardRecords;
};

function validateInput(){
  var rawUsername = $("#username").val() || "??????";
  var slicedUsername = rawUsername.slice(0, 17);
  if (slicedUsername.indexOf(">") !== -1){
    slicedUsername = "Invalid Name";
  }
  return slicedUsername;
}

ScoreboardHelpers.prototype.renderScores = function(allScores, scoreboardLength){
  for (var i = 0; i < scoreboardLength; i++) {
    $('#scoreboard-records').append(i+1 + ". " + allScores[i].username + ": " + allScores[i].points + "<br>");
  }
};

ScoreboardHelpers.prototype.addScores = function(scoreboardRecords, allScores){
  for (var i = 0; i < 5; i++) {
    if (allScores[i] !== undefined) {
      scoreboardRecords.push(allScores[i]);
    }
  }
  return scoreboardRecords;
};

ScoreboardHelpers.prototype.sortScores = function(scores){
  var sortedScores = scores.sort(function(a, b){return b.points - a.points;});
  return sortedScores;
};

module.exports = ScoreboardHelpers;
