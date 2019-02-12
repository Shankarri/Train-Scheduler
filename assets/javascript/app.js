console.log("inside app. js");

$(document).ready(function () {


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB6RZT2GbjJE5dQH9BLNZKMUM2r6RPfozw",
      authDomain: "shanki-train-scheduler.firebaseapp.com",
      databaseURL: "https://shanki-train-scheduler.firebaseio.com",
      projectId: "shanki-train-scheduler",
      storageBucket: "shanki-train-scheduler.appspot.com",
      messagingSenderId: "605714533579"
    };
    firebase.initializeApp(config);
  
    var dataRef = firebase.database();

  var trainDetails = [
    {
      trainName: "Trenton Express",
      destination: "Trenton",
      frequency: 25,
      firstTrain: "05.35 PM",
    },
    {
      trainName: "Midnight Carriage",
      destination: "Philadelphia",
      frequency: 15,
      nextArrival: "05.33 PM",
      firstTrain: "05.35 PM",
      minutesAway: 13
    },
    {
      trainName: "Trenton Express",
      destination: "Trenton",
      frequency: 25,
      nextArrival: "05.35 PM",
      firstTrain: "05.35 PM",
      minutesAway: 10
    },
  ];

  updateTrainSchedule(trainDetails);
  // ---------------- Start of Function for populating Dynamic Buttons or Dynamic Images as per the array parameter---------------- //
  function updateTrainSchedule(trainDetailsArr) {

    // Go through loop for every array element
    for (var index in trainDetailsArr) {

      // If the passed parameter is buttons then create buttons using passed array values
      var sno = parseInt(index) + 1;
      var tableRow = $("<tr id=" + index + ">");
      tableRow.append("<td>" + sno + "</td>");
      tableRow.append("<td> <input type='text' value='" + trainDetailsArr[index].trainName + "' readonly class='text-primary form-control-plaintext' /></td>");
      tableRow.append("<td> <input type='text' value='" + trainDetailsArr[index].destination + "' readonly class='text-primary form-control-plaintext' /></td>");
      tableRow.append("<td>" + trainDetailsArr[index].frequency + "</td>");
      tableRow.append("<td> <input type='text' value='" + trainDetailsArr[index].nextArrival + "' readonly class='text-primary form-control-plaintext' /></td>");
      tableRow.append("<td>" + trainDetailsArr[index].minutesAway + "</td>");
      tableRow.append("<td class='text-center'><button class='btn btn-danger p-0 btn-sm remove-btn' id=" + index + "> X </button></td>");
      $("#trainDetails-content").append(tableRow);

    }
    //--------End of For loop-----------------------
  }





function getTrainDetailsArray()
{
  var index = 0; 
/*   dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    trainDetails[index].trainName = snapshot.val().trainName;
    trainDetails[index].destination = snapshot.val().destination;
    trainDetails[index].firstTrain= snapshot.val().firstTrain;
    trainDetails[index].frequency= snapshot.val().frequency;
  }); */

}


  var currentTime = moment();
  console.log("currentTime");
  $("#currentTime").html("Current Time : " + moment(currentTime).format("hh:mm"));


  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    $("#form-content")[0].reset();
    
    // Code for the push
 /*    dataRef.ref().push({

      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    }); */
  });

});