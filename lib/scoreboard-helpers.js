class ScoreboardHelpers {
  constructor() {}

  addToScoreboardRecords(scoreboardRecords, points) {
    let username = this.validateInput();
    scoreboardRecords.push({username: username, points: points});
    return scoreboardRecords;
  }

  validateInput() {
    let rawUsername = $("#username").val() || "??????";
    let slicedUsername = rawUsername.slice(0, 17);
    if (slicedUsername.indexOf(">") !== -1){
      slicedUsername = "Invalid Name";
    }
    return slicedUsername;
  }

  renderScores(allScores, scoreboardLength) {
    for (let i = 0; i < scoreboardLength; i++) {
      $('#scoreboard-records').append(i+1 + ". " + allScores[i].username + ": " + allScores[i].points + "<br>");
    }
  }

  addScores(scoreboardRecords, allScores) {
    for (let i = 0; i < 5; i++) {
      if (allScores[i] !== undefined) {
        scoreboardRecords.push(allScores[i]);
      }
    }
    return scoreboardRecords;
  }

  sortScores(scores) {
    let sortedScores = scores.sort(function(a, b){return b.points - a.points;});
    return sortedScores;
  }
}

module.exports = ScoreboardHelpers;
