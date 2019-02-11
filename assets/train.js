 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDJ4KX6GDAvmuACgcf2vnRKrSTBBEGH6xI",
    authDomain: "spaceshipschedule.firebaseapp.com",
    databaseURL: "https://spaceshipschedule.firebaseio.com",
    projectId: "spaceshipschedule",
    storageBucket: "spaceshipschedule.appspot.com",
    messagingSenderId: "344340405220"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// intial values
var ship = "";
var destination = "";
var startTime = "";
var frequency = 0;

// Click Button changes what is stored in firebase
// Whenever a user clicks the submit button
$("#submit").on("click", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    ship = $("#ship-name").val().trim();
    destination = $("#destination").val().trim();
    startTime = $("#start-time").val().trim();
    frequency = $("#frequency").val().trim();
    // Change what is saved in firebase
    database.ref().push({
        ship: ship,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
    });
});


// To load to HTML
database.ref().on("child_added", function (childSnapshot) {

    var newShip = childSnapshot.val().ship;
    var newDestination = childSnapshot.val().destination;
    var newFreq = childSnapshot.val().frequency;

    // First Time
    var startTimeConverted = moment(newShip, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % newFreq;

    // Minute(s) Until
    var minutesTilShip = newFreq - tRemainder;

    // Next Ship
    var nextShip = moment().add(minutesTilShip, "minutes");
    var catchShip = moment(nextShip).format("HH:mm");

    // Display On Page
    $("#all-display").append(
      ' <tr><td>' + newShip +
      ' </td><td>' + newDestination +
      ' </td><td>' + newFreq +
      ' </td><td>' + catchShip +
      ' </td><td>' + minutesTilShip + ' </td></tr>');

}); 
