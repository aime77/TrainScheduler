$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdCO_oKEQ62GYz3Kl4kfPbuCrC0lSNK34",
    authDomain: "trainscheduler-764f4.firebaseapp.com",
    databaseURL: "https://trainscheduler-764f4.firebaseio.com",
    storageBucket: "trainscheduler-764f4.appspot.com",
  };
  firebase.initializeApp(config);

var database=firebase.database();
    

function renderRows() {
    $("#tableBody").empty();
    for(var i=0; i<rowArray.length;i++){
        var trow=$("<tr>");
        var t_rowScope=$("<th>").attr("scope", "row");
        var t_trainName;
        var t_destination;
        var t_time;
        var t_frequency;
        trow.append(t_trainName, t_destination, t_time, t_frequency);
        $("#tableBody").append(trow);


    }

    }


    //submit button function
    $("#submitB").on("click", function(event) {

        event.preventDefault();

        var trainName = $("#inputTrainName").val().trim();
        var destination = $("#inputDestination").val().trim();
        var time = $("#inputTime").val().trim();
        var frequency = $("#inputFrequency").val().trim();


        database.ref().set({
            db_trainName: trainName,
            db_destination: destination,
            db_time: time,
            db_frequency: frequency,
          });
    

    });

    database.ref().on("value", function(retrieve){
        $("#tableBody").empty();
        console.log(retrieve.val());

        //change html associated with number
        //update value with data from database

    },function(errorObject){
        console.log("The read failed"+errorObject.code);
        });
})