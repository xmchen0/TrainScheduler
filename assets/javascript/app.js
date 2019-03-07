/* 

UofT Boot Camp -- Train Scheduler

*/


$(document).ready(function () {

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
        // Reset form
        $("form")[0].reset();
    });

    // Firebase watcher + initial loader
    database.ref().on("child_added", function (childSnapshot) {
        var nextArr;
        var minsAway;
        // Change year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minsAway = childSnapshot.val().frequency - remainder;
        // Calculate next train time
        var nextTrain = moment().add(minsAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#addTrain").append("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + nextTrain +
            "</td><td>" + minsAway + "</td></tr>");

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});