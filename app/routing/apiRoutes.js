// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
console.log(friends)


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    console.log("POST: ", req.body)
    var newScores = req.body.scores
    newScores = [1,2,3,4,5,1,2,3,4,5]
    var bestMatch = {
      name: "",
      photo: ""
    }
    /// build the matching 
    // you will get the object in the req.body with name , pic and array of responses
    // you will compare the responses with the responses of all the friends inside of the array 
    // you will return the name and pic of the friend with the minimun diference 
    var minDiff = 100
    for (var i = 0; i < friends.length; i++) { //loop the array of friends
      var scores = friends[i].scores
      var dif = 0
      for (var j = 0; j < scores.length; j++) {  //   4-5 = 1  5-4 =1  // loop the array of scores

        dif = dif + (Math.abs(scores[j] - newScores[j]))

      }

      if (dif < minDiff) {
        bestMatch.name = friends[i].name
        bestMatch.photo = friends[i].photo
        minDiff = dif
      }

    }
    console.log(bestMatch)
    res.json("hi")

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!



  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friends.length = 0;

    res.json({ ok: true });
  });
};