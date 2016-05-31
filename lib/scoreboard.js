let firebase = require('firebase');
require('firebase/database');
let firebaseConfig = require('./firebase-config');
let firebaseApp = firebase.initializeApp(firebaseConfig);
let fireDb = firebaseApp.database();
let scoreboardRecords = [];
const ScoreboardHelpers = require('./scoreboard-helpers');
let helpers = new ScoreboardHelpers();

class Scoreboard {
  constructor() {}

  showHighScoreEntry(points) {
    if (scoreboardRecords[4].points < points){
      $('.scoreboard').hide();
      $('.high-score-entry').css('display', 'inline-block');
    }
  }

  sendHighScore(points) {
    scoreboardRecords = helpers.addToScoreboardRecords(scoreboardRecords, points);
    fireDb.ref('highscore/').set({
      highscores: scoreboardRecords
    });
    event.preventDefault();
    $(".high-score-entry").hide();
    $('#username').val('');
    this.loadScoreboard();
    $('.scoreboard').show();
  }

  loadScoreboard() {
    scoreboardRecords = [];
    $('#scoreboard-records').empty();
    fireDb.ref('highscore/').once('value').then(function(scores){
      let allScores = helpers.sortScores(scores.val().highscores);
      scoreboardRecords = helpers.addScores(scoreboardRecords, allScores);
      helpers.renderScores(allScores, scoreboardRecords.length);
    });
  }
}

module.exports = Scoreboard;
