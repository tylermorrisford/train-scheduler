// Set current day and time
$(document).ready(function () {
    setInterval(update, 1000);
})

function update() {
    var localTime = moment().format('h:mm:ss A');
    $("#local-time").text(localTime);
};

var currentDay = moment().format('MMMM D YYYY');
$("#current-day").text(currentDay);


// train scheduler logic.js
// Firebase config_________
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

$("#newTrain").on("click", function (event) {
    event.preventDefault();
    // if user submits form with a blank input
    if ( $("#train").val() === "" || $("#destination").val() === "" || $("#start-time").val() === "" || $("#frequency").val()=== "" ) {
        alert("Please enter train information using alphanumerics instead of E.S.P.");
        $("#train").val("");
        $("#destination").val("");
        $("#start-time").val("");
        $("#frequency").val("");
    } else {
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
    }
    })
// database ref retrieves train data to display
database.ref().on("child_added", function (snapshot) {
    var nameNow = snapshot.val().name;
    var destNow = snapshot.val().destination;
    var firstTrainString = snapshot.val().start;
    var freqNow = snapshot.val().frequency;

    // Logic for calculating Next Arrival / Minutes Away (or next departure)  
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrain = moment(firstTrainString, "HH:mm").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var tRemainder = diffTime % freqNow;
    var tMinutesTillTrain = freqNow - tRemainder;
    // Next Train
    var nextTrainMilliseconds = moment().add(tMinutesTillTrain, "minutes");
    var nextTrain = moment(nextTrainMilliseconds).format("hh:mm");

    // logic for building next row in table
    var nextRow = $("<tr>");
    var nameDisplay = $("<td>" + nameNow + "</td>");
    var destDisplay = $("<td>" + destNow + "</td>");
    var freqDisplay = $("<td>" + freqNow + "</td>");
    var nextDisplay = $("<td>" + nextTrain + "</td>");
    var awayDisplay = $("<td>" + tMinutesTillTrain + "</td>");
    var nextTrain = nextRow.append(nameDisplay, destDisplay, freqDisplay, nextDisplay, awayDisplay);
    $("#new-train-row").append(nextTrain);

})

