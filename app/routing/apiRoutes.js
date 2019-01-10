var friends = require("../data/friends.js");

module.exports = function apiRoutes(app) {
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests

  app.post("/api/friends", function(req, res) {
    var matchFriendInfo = bestMatch(friends, req.body);
    friends.push(req.body);
    res.json(matchFriendInfo);
  });

  function bestMatch(friends, newFriend) {
    var closestDifference = 50;
    var matchFriend;
    for (var i = 0; i < friends.length; i++) {
      var friend = friends[i];
      var difference = 0;
      for (var j = 0; j < newFriend.scores.length; j++) {
        var answerA = newFriend.scores[j];
        var answerB = friend.scores[j];
        difference = difference + Math.abs(answerA - answerB);
      }

      if (difference < closestDifference) {
        closestDifference = difference;
        matchFriend = friend;
      }
    }
    return {
      name: matchFriend.name,
      photo: matchFriend.photo
    };
  }
};
