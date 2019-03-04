/* 

UofT Boot Camp -- Train Scheduler

Credit references to week 07 - activity 19 Add_Child

*/


$(document).ready(function () {
    // Current Date and Time
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    $('#currentDateTime').html("<b>" + hours + ":" + minutes + " " + "</b>");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAjgO1vgBduBaqxgyoCaPln2Guk1MGXNJk",
        authDomain: "train-scheduler-7734e.firebaseapp.com",
        databaseURL: "https://train-scheduler-7734e.firebaseio.com",
        projectId: "train-scheduler-7734e",
        storageBucket: "",
        messagingSenderId: "349975756748"
    };
    firebase.initializeApp(config);

    // Get database
    var database = firebase.database();

    // Initial Values
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    // Capture Button Click
    $("#submitBtn").on("click", function () {
        event.preventDefault();

        // Storing and retreiving most recent train data
        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrain = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        // Code for the push to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // Firebase watcher + initial loader
        database.ref().on("child_added", function (childSnapshot) {
     

            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    });

});