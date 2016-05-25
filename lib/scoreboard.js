var firebase = require('firebase');
require('firebase/database');
var firebaseConfig = require('./firebase-config');
var firebaseApp = firebase.initializeApp(firebaseConfig);
var fireDb = firebaseApp.database();
var scoreboardRecords = [];
const ScoreboardHelpers = require('./scoreboard-helpers');
var helpers = new ScoreboardHelpers();

function Scoreboard(){}

Scoreboard.prototype.showHighScoreEntry = function(points){
  if (scoreboardRecords[4].points < points){
    $('.scoreboard').hide();
    $('.high-score-entry').css('display', 'inline-block');
  }
};

Scoreboard.prototype.sendHighScore = function(points){
  scoreboardRecords = helpers.addToScoreboardRecords(scoreboardRecords, points);
  fireDb.ref('highscore/').set({
    highscores: scoreboardRecords
  });
  event.preventDefault();
  $(".high-score-entry").hide();
  this.loadScoreboard();
  $('.scoreboard').show();
};

Scoreboard.prototype.loadScoreboard = function(){
  scoreboardRecords = [];
  $('#scoreboard-records').empty();

  fireDb.ref('highscore/').once('value').then(function(scores){
    var allScores = helpers.sortScores(scores.val().highscores);
    scoreboardRecords = helpers.addScores(scoreboardRecords, allScores);
    helpers.renderScores(allScores, scoreboardRecords.length);
  });
};

module.exports = Scoreboard;
