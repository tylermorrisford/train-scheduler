// Set current day and time
$(document).ready(function(){
    setInterval(update, 1000);
})

function update() {
    var localTime = moment().format('h:mm:ss A');
    $("#local-time").text(localTime);
    };

var currentDay = moment().format('MMMM D YYYY');
$("#current-day").text(currentDay);


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

  $("#newTrain").on("click", function(event) {
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
        var firstTrainString = snapshot.val().start;
        var freqNow = snapshot.val().frequency;
        console.log(snapshot.val());
    
        // Logic for calculating Next Arrival / Minutes Away (or next departure)   
//         compare startNow to moment() current time 
//             // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); 
// 
var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log("this time is: " + currentTime);
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

