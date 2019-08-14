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
    var newName = $("#name").val().trim();
    var newRole = $("#role").val().trim();
    var newStart = $("#start-date").val().trim();
    var newRate = $("#monthly-rate").val().trim();

    database.ref().push({
        name: newName,
        role: newRole,
        start: newStart,
        rate: newRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    // empty the form on submit 
    $("#name").val("");
    $("#role").val("");
    $("#start-date").val("");
    $("#monthly-rate").val("");
})
// database ref retrieves train data to display
    database.ref().on("child_added", function(snapshot){
        // 
        var nameNow = snapshot.val().name;
        var roleNow = snapshot.val().role;
        var startNow = snapshot.val().start;
        var rateNow = snapshot.val().rate;
        console.log(snapshot.val());


    // logic for builing next row in table
        var nextRow = $("<tr>");
        var nameDisplay = $("<td>" + nameNow + "</td>");
        var roleDisplay = $("<td>" + roleNow + "</td>");
        var startDisplay = $("<td>" + startNow + "</td>");
        var monthsDisplay = $("<td>#</td>");
        var rateDisplay = $("<td>" + rateNow + "</td>");
        var totalDisplay = $("<td>#</td>");
        var nextEmployee = nextRow.append(nameDisplay, roleDisplay, startDisplay, monthsDisplay, rateDisplay, totalDisplay);
        $("#new-emp-row").append(nextEmployee);

      })

