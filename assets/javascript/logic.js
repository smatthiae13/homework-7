//Take input
//onclick listener submit button
//post it to Firebase with .push
//post train name, destination, frequency, first train
//create div-table elements and add information from form to table
//Do math on next arrival and minutes away
//add that too, to the table





// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1766ejPoO6DdU1sTxKpAOUGN6ayGIjQc",
  authDomain: "bahnhof-a-cho-cho.firebaseapp.com",
  databaseURL: "https://bahnhof-a-cho-cho.firebaseio.com",
  projectId: "bahnhof-a-cho-cho",
  storageBucket: "",
  messagingSenderId: "657557987520"
};
firebase.initializeApp(config);


var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var freq = 0;
var minAway = 0;

//submit gets clicked to add info
$("#submit").on("click", function (event) {
  event.preventDefault();


  //gets input from the form
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#first-train-time").val().trim();
  var trainFrequency = $("#freq").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(trainFrequency);










//first time - pushed back 1 year to make sure it comes before current time
var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

//current time
var currentTime = moment();
console.log("CurrentTime:" + moment(currentTime).format("HH:mm"));

//difference between the times
var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference in Time:" + timeDiff);

//time apart - remaining
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

//minutes until train
var minutesRemaining = tFrequency - tRemainder;
console.log("minutes till train:" + minutesRemaining);

//next train
var nextTRain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//local temp data store object
var newTrain = {
  trainName: trainName,
  destination: destination,
  firstTrainTime: firstTrainTime,
  trainFrequency: trainFrequency,
  nextTrain: nextTrain,
  minutesRemaining: minutesRemaining,
};

//pushes to database
database.ref().push(newTrain);



console.log("train name in DB" + newTrain.trainName);
console.log("destination in DB" + newTrain.destination);
console.log("first train time in DB" + newTrain.firstTrainTime);
console.log("train frequency in DB" + newTrain.trainFrequency);
console.log("next train in DB" + newTrain.nextTrain);
console.log("minutes away in DB" + newTrain.minutesRemaining);

//clears form
$("#train-name").val("");
$("#destination").val("");
$("#first-train-time").val("");
$("#freq").val("");


//takes snapshot of database
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().trainFrequency;
  var nextTrain = childSnapshot.val().nextTrain;
  var minutesRemaining = childSnapshot.val().minutesRemaining;


  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(trainFrequency);
  console.log(nextTrain);
  console.log(minutesRemaining);

  //enter moment.js here
  //var diffTime = moment().diff(moment.unix(firstTrain))
  //creating row, and adding/appending info
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesRemaining)

  );

    // Append the new row to the table
    $("#results > tbody").append(newRow);
  });

});



//var differenceTimes = moment().diff(moment.unix(firstTrain), "minutes");
//console.log("difference in time: " + differenceTimes); // lets see what we get

