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


  // Initialize global variables
  $("#user-msg").hide();
  var trainAlreadyPresent = false;
  var currentTime = moment();
  $("#currentTime").html("Current Time : " + moment(currentTime).format("hh:mm"));
  var index = 0;

  // ---------------- Start of Function for populating Dynamic Train Details as stored in Firebase---------------- //
  dataRef.ref().on("child_added", function (childSnapshot) {

    var frequency = parseInt(childSnapshot.val().frequency);
    var firstTrain = childSnapshot.val().firstTrain;

    // Calculate Minutes Away and Next Train time from details stored in Firebase
    var minutesAway = frequency - (moment(firstTrain , "HH:mm").diff(moment(), "minutes") % frequency);
    var nextTrain = moment().add(minutesAway, "minutes");
    nextTrain =  moment(nextTrain).format ("HH:mm");

    // Updating the Train details in the Train Schedule table 
    var sno = parseInt(index) + 1;
    var tableRow = $("<tr id='row" + index + "'>");
    tableRow.append("<td>" + sno + "</td>");
    tableRow.append("<td> <input type='text' value='" + childSnapshot.val().trainName + "' readonly class='updatedTrainName text-primary form-control-plaintext' /></td>");
    tableRow.append("<td> <input type='text' value='" + childSnapshot.val().destination + "' readonly class='text-primary form-control-plaintext' /></td>");
    tableRow.append("<td>" + childSnapshot.val().frequency + "</td>");
    tableRow.append("<td> <input type='text' value='" +nextTrain  + "' readonly class='text-primary form-control-plaintext' /></td>");
    tableRow.append("<td>" + minutesAway + "</td>");
    tableRow.append("<td class='text-center'><button class='btn btn-danger p-0 btn-sm remove-btn' id=" + index + "> X </button></td>");
    $("#trainDetails").append(tableRow);
    index++;

  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

// ----------------------------------------------------------------------------------------- //

// ---------------- When Submit button of the form is clicked---------------- //

  $("#submit-btn").on("click", function (event) {

    // Get all the values from user input
    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var firstTrain = $("#firstTrainHour").val() +":" +$("#firstTrainMin").val();
    var frequency = $("#frequency").val();

    // If none of the values are empty  
    if (trainName != "" && destination != "" && firstTrain != "" && frequency != "") {
      event.preventDefault();
      trainAlreadyPresent = false;

      // Compare the user given train name with train names already present in the Table
      $.each($(".updatedTrainName"), function (index, value) {
        if (((trainName.trim()).toLowerCase()).replace(/\ /g, '') == ((this.value).toLowerCase()).replace(/\ /g, '') ) {
          // If the user Train name is already present in Train schedule table then show error
          $("#user-msg").show();
          setTimeout(function () { $("#user-msg").hide(); }, 4000);
          trainAlreadyPresent = true;
          return false;
        }
      });

      // Check user input train name is not present then update the firebase database
      if (!trainAlreadyPresent) {
        
        dataRef.ref().push({
          trainName: trainName.trim(),
          destination: destination.trim(),
          firstTrain: firstTrain.trim(),
          frequency: frequency.trim(),
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
      // Empty the form elements
       $("#trainName").val("");
       $("#destination").val("");
       $("#firstTrainHour").val("");
       $("#firstTrainMin").val("");
       $("#frequency").val("");
    
      }
    }
  });
// ----------------------------------------------------------------------------------------- //

// ---------------- Start of Function for populating Dynamic Train Details as stored in Firebase---------------- //
  $(document).on("click", ".remove-btn", function () {
    var rowId ="#row"+ ($(this).attr("id"));
    //  remove the table row for which we clicked the remove button
    $(rowId).empty();
    // Note: This only removes the content in web page but it will not be deleted in Firebase
  });
// ----------------------------------------------------------------------------------------- //

});