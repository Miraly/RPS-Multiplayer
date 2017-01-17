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
var playersCount;


var connectionsRef = database.ref("/players"); //adding a watcher for connections to firebase
var connectedRef = database.ref(".info/connected"); 
 // '.info/connected' is a special location provided by Firebase that is updated every time
      // the client's connection state changes.
      // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
   
connectedRef.on("value", function(snap) {
        // If they are connected..
        if (snap.val()) {
          var con = connectionsRef.push(true); // Add user to the connections list.
		  con.onDisconnect().remove();  // Remove user from the connection list when they disconnect.
		 }
});

connectionsRef.on("value", function(snap) {
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
		playersCount = snap.numChildren();
        console.log(playersCount);
});

$(document).ready(function(){
	
	$("#add-player").on("click", function(event) {
//        if (playersCount === 2) {
//		$("#player-name").html("Sorry, no more spots, come back later!");
//		} else {
        event.preventDefault();
		
		var playerName = $("#player-input").val();
		playerChoice = "none";
	
		$("#player-name").html("Hi " + playerName);
		
		database.ref("playersInfo").push({
			playerName: playerName,
			pick: playerChoice,
			wins: winsCount,
			losses: lossesCount
		});
		
//		 var users = database.ref("players");
//
//		// Code for the set
//		users.child('playerName').set({
//		  playerName: playerName,
//			pick: playerChoice,
//			wins: winsCount,
//			losses: lossesCount
//		});

		
		$("#current-player").html(playerName);
		$(".wins").html("Wins: " + winsCount);
		$(".losses").html("Losses: " + lossesCount);
//		}
	 });
	
	$(".rps-button").on("click", function(){
		$(".select").html(this.id);
		playerChoice = this.id;
		console.log(this.id)
		// Add this value to Firebase
	});
	
	

	
// This is a future logic to define the winner
	
//	if ((player1 === "r") || (player1 === "p") || (player1 === "s")) {
//         
//          if ((player1 === "r") && (player2 === "s")) {
//            alert("You win!");
//          }
//          else if ((player1 === "r") && (player2 === "p")) {
//            alert("You lose!");
//          }
//          else if ((player1 === "s") && (player2 === "r")) {
//             alert("You lose!");
//          }
//          else if ((player1 === "s") && (player2 === "p")) {
//            alert("You win!");
//          }
//          else if ((player1 === "p") && (player2 === "r")) {
//            wins++;
//          }
//          else if ((uplayer1 === "p") && (player2 === "s")) {
//             alert("You lose!");
//          }
//          else if (player1 === player2) {
//            alert("It's tie!");
//          }
//	}
});