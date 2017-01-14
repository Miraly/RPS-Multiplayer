 var config = {
    apiKey: "AIzaSyA0kuNi1BfHpYCYW9RB4qkw1UMSHyDkEpE",
    authDomain: "rps-multiplayer-eac96.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-eac96.firebaseio.com",
    storageBucket: "rps-multiplayer-eac96.appspot.com",
    messagingSenderId: "201178563925"
  };
firebase.initializeApp(config);

var database = firebase.database();
var winsCount = 0;
var lossesCount = 0;
var playerChoice;

var connectionsRef = database.ref("/players"); //adding a watcher for connections to firebase
var connectedRef = database.ref(".info/connected"); 
 // '.info/connected' is a special location provided by Firebase that is updated every time
      // the client's connection state changes.
      // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
   
// If they are connected..
     if (snap.val()) {

          // Add user to the connections list.
          var con = connectionsRef.push(true);

          // Remove user from the connection list when they disconnect.
          con.onDisconnect().remove();
        }
      });


$(document).ready(function(){
	$("#add-player").on("click", function(event) {
        
        event.preventDefault();
		
		var playerName = $("#player-input").val();
		$("#player-name").html("Hi " + playerName);
		$("#current-player").html(playerName);
		$(".wins").html("Wins: " + winsCount);
		$(".losses").html("Losses: " +lossesCount);

	 });
	
	$(".rps-button").on("click", function(){
		$(".select").html(this.id);
		playerChoice = this.id
		// Add this value to Firebase
	});

	
// This is a future logic to define the winner
	
//	if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {
//         
//          if ((userGuess === "r") && (computerGuess === "s")) {
//            alert("You win!");
//          }
//          else if ((userGuess === "r") && (computerGuess === "p")) {
//            alert("You lose!");
//          }
//          else if ((userGuess === "s") && (computerGuess === "r")) {
//             alert("You lose!");
//          }
//          else if ((userGuess === "s") && (computerGuess === "p")) {
//            alert("You win!");
//          }
//          else if ((userGuess === "p") && (computerGuess === "r")) {
//            wins++;
//          }
//          else if ((userGuess === "p") && (computerGuess === "s")) {
//             alert("You lose!");
//          }
//          else if (userGuess === computerGuess) {
//            alert("It's tie!");
//          }
//	}
});