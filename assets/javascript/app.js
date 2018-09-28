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

//current in minutes
var d = new Date();
var minute = (d.getHours() * 60) + d.getMinutes();
console.log(minute);


//frequency calculation from start time in 1 day (1440 minutes)
function calTime(frequency, time) {
    console.log(frequency);
    console.log(time);
    console.log(minute);
    timeArray = [];

    for (var i = frequency; i <= 1440; i = i + frequency) {
        timeArray.push(i);
    }
    newTime(timeArray, minute);
    return timeArray;
}

//arrival time closest to current time
function newTime(timeArray, minute) {
    console.log(minute);
    console.log(timeArray);
    for (var i = 0; i < timeArray.length; i++) {
        if (timeArray[i] >= minute) {
            var saved = timeArray[i];
            console.log(saved);
            convertMinutes(saved);
            return saved;
        }
    }
}

//covert next arrival time to hh:mm format

function convertMinutes(saved) {
   var d = addZero(Math.floor(saved / 1440)); // 60*24
    var h = addZero(Math.floor((saved - (d * 1440)) / 60));
   var  m = addZero(Math.round(saved % 60));
   var nextArrivalTime;
    if (d > 0) {
        return (d + " days, " + h + " hours, " + m + " minutes");
    } else {
        nextArrivalTime = h + ":" + m;
        console.log(nextArrivalTime);
        
    }
    var minAway=moment().diff(moment(nextArrivalTime), "minutes");
    return {
        nextArrivalTime,
        minAway
    };
}

function displayTrain(data) {
    const info = convertMinutes(saved);
    return `<tr >
                <td>${data.trainName}</td>
                <td>${data.destination}</td>
                <td>${data.frequency}</td>
                <td>${info.nextArrivalTime}</td>
                <td>${info.minAway}</td>
            </tr>`;
 }

//add "0" if necessary
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//submit button function
$("#submitB").on("click", function (event) {
    event.preventDefault();

    var train = {};
    train.trainName = $("#inputTrainName").val().trim();
    train.destination = $("#inputDestination").val().trim();
    train.time = $("#inputTime").val().trim();
    train.frequency = $("#inputFrequency").val().trim();
    train.dataAdded= firebase.database.ServerValue.TIMESTAMP;

    database.ref().push(train);

    $("#inputTrainName").empty();
    $("#inputDestination").empty();
    $("#inputTime").empty();
    $("#inputFrequency").empty();
    
});

database.ref().on("child_added", function (retrieveData) {

    var data = retrieveData.val();
    console.log(data);

    $("#tableBody").append(displayTrain(data));

    
    //var nextArr = nextArrivalF(frequency);
    

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



