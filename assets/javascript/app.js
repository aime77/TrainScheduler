var config = {
    apiKey: "AIzaSyDdCO_oKEQ62GYz3Kl4kfPbuCrC0lSNK34",
    authDomain: "trainscheduler-764f4.firebaseapp.com",
    databaseURL: "https://trainscheduler-764f4.firebaseio.com",
    projectId: "trainscheduler-764f4",
    storageBucket: "trainscheduler-764f4.appspot.com",
    messagingSenderId: "552326271138"

};

firebase.initializeApp(config);
var database = firebase.database();
//submit button function
function removeClassb() {
    $("#submitB").removeClass("fa fa-check-square-o");
}
function buttonDisplay() {
    setTimeout(removeClassb, 4000);
}

$("#submitB").on("click", function (event) {

    event.preventDefault();
    $("#submitB").addClass("fa fa-check-square-o");

    var train = {};
    train.trainName = $("#inputTrainName").val().trim();
    train.destination = $("#inputDestination").val().trim();
    train.time = $("#inputTime").val().trim();
    train.frequency = $("#inputFrequency").val().trim();
    train.dataAdded = firebase.database.ServerValue.TIMESTAMP;

    database.ref().push(train);

    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputTime").val("");
    $("#inputFrequency").val("");
    buttonDisplay();
});

$(".form").submit(function (e) {

    if ($("#inputTrainName").val().trim() === "" && $("#inputTrainName").val().trim() === "" && $("#inputTrainName").val().trim() === "" && $("#inputTrainName").val().trim() === "") {
        console.log("test");
        e.preventDefault();
        alert('You did not fill out the fields');
        return false;
    }
});


database.ref().on("child_added", function (retrieveData) {
    var data = retrieveData.val();
    var time = moment(data.time, "HH:mm").format();
    var timeRemainder = (moment().diff(time, "minutes")) % data.frequency;
    var minAway = data.frequency - timeRemainder;
    var nextArrTime = moment().add(minAway, "m").format("hh:mm A");
    if (isNaN(minAway)) {
        nextArrTime = "";
        minAway = "";
    }
    $("#tableBody").append(`<tr >
        <td id="tname">${data.trainName}</td>
        <td id="des">${data.destination}</td>
        <td id="freq">${data.frequency}</td>
        <td id="nextArr">${nextArrTime}</td>
        <td id="minAway">${minAway}</td>
    </tr>)`);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
