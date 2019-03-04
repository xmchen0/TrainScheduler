$(document).ready(function () {
    // Current Date and Time
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    $('#currentDateTime').html("<b>" + hours + ":" + minutes + " " + "</b>");
    $('#currentDateTime').datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date());

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

   

});