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
