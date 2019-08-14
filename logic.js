// train scheduler logic.js
  // Firebase config_____________________________________
  var firebaseConfig = {
    apiKey: "AIzaSyCXoEOxIg_8unXVQZOjhdwPqI-LHNbjwO8",
    authDomain: "trainscheduler-bc2019.firebaseapp.com",
    databaseURL: "https://trainscheduler-bc2019.firebaseio.com",
    projectId: "trainscheduler-bc2019",
    storageBucket: "",
    messagingSenderId: "314757289892",
    appId: "1:314757289892:web:2f889d1064715d3e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#newEmployee").on("click", function(event) {
      event.preventDefault();
    var newTrain = $("#train").val().trim();
    var newDestination = $("#destination").val().trim();
    var newStart = $("#start-time").val().trim();
    var newFreq = $("#frequency").val().trim();

    database.ref().push({
        name: newTrain,
        destination: newDestination,
        start: newStart,
        frequency: newFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    // empty the form on submit 
    $("#train").val("");
    $("#destination").val("");
    $("#start-time").val("");
    $("#frequency").val("");
})
// database ref retrieves train data to display
    database.ref().on("child_added", function(snapshot){
        // 
        var nameNow = snapshot.val().name;
        var destNow = snapshot.val().destination;
        var startNow = snapshot.val().start;
        var freqNow = snapshot.val().frequency;
        console.log(snapshot.val());
    
        // Logic for calculating Next Arrival / Minutes Away (or next departure)   




    // logic for building next row in table
        var nextRow = $("<tr>");
        var nameDisplay = $("<td>" + nameNow + "</td>");
        var destDisplay = $("<td>" + destNow + "</td>");
        var freqDisplay = $("<td>" + freqNow + "</td>");
        var nextDisplay = $("<td>#</td>");
        var awayDisplay = $("<td>#</td>");
        var nextTrain = nextRow.append(nameDisplay, destDisplay, freqDisplay, nextDisplay, awayDisplay);
        $("#new-train-row").append(nextTrain);

      })

