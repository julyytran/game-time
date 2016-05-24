var firebase = require('firebase');
require('firebase/database');
var config = {
  apiKey: "AIzaSyB7WYLfPqM1FhRDE6WUEaru-14-d963vN4",
  authDomain: "go-go-nyan-cat.firebaseapp.com",
  databaseURL: "https://go-go-nyan-cat.firebaseio.com",
  storageBucket: "go-go-nyan-cat.appspot.com",
};
var firebaseApp = firebase.initializeApp(config);
var fireDb = firebaseApp.database();
var scoreboardRecords = []

function Scoreboard(){}

Scoreboard.prototype.savePoints = function(points){
  var username = $("#username").val() || "unknown user"
  scoreboardRecords.push({username: username, points: points});
  fireDb.ref('highscore/').set({
    highscores: scoreboardRecords
  });
};

Scoreboard.prototype.loadScoreboard = function(){
  var scoreboard = this
  scoreboardRecords = [];
  $('#scoreboard-records').empty();

  fireDb.ref('highscore/').once('value').then(function(scores){
    var allScores = scoreboard.sortScores(scores.val().highscores);

    for (var i = 0; i < 5; i++) {
      if (allScores[i] !== undefined) {
        scoreboardRecords.push(allScores[i]);
      }
    }

    for (var i = 0; i < scoreboardRecords.length; i++) {
      $('#scoreboard-records').append(i+1 + ". " + allScores[i].username + ": " + allScores[i].points + "<br>");
    }
  });
};

Scoreboard.prototype.sortScores = function(scores){
  var sortedScores = scores.sort(function(a, b){return b.points - a.points})
  return sortedScores
};

module.exports = Scoreboard;
