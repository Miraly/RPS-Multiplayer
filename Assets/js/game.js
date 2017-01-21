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
var playersCount = 0;
var opponent;
var playerNum = 1;

var playerName;
var player1Pick;
var player2Pick;



var playerRef = firebase.database().ref('players');
var connectionsRef = database.ref("/players"); //adding a watcher for connections to firebase
var connectedRef = database.ref(".info/connected"); 
 
   
//connectedRef.on("value", function(snap) {
//        // If they are connected..
//        if (snap.val()) {
//          var con = connectionsRef.push(true); // Add user to the connections list.
//		  con.onDisconnect().remove();  // Remove user from the connection list when they disconnect.
//		 }
//});

connectionsRef.on("value", function(snap) {
        
        // The number of online users is the number of children in the connections list.
		playersCount = snap.numChildren();
	console.log('playerCount', playersCount);
        console.log(playersCount);
});

$(document).ready(function(){
	
		$("#add-player").on("click", function(event) {
		console.log(playersCount);
        if (playersCount > 2) {
			$("#player-name").html("Sorry, no more spots, come back later!");
			event.preventDefault();
		} else {
        	event.preventDefault();
		
			playerName = $("#player-input").val();
			playerChoice = "none";
	
			$("#player-name").html("Hi " + playerName);
		
		 	var users = database.ref("players");
			
		// Code for the set
			users.child(playerName).set({
				playerNum: playerNum,
			  	playerName: playerName,
				pick: playerChoice,
				wins: winsCount,
				losses: lossesCount
			});
		
			$("#current-player").html(playerName);
			$(".wins").html("Wins: " + winsCount);
			$(".losses").html("Losses: " + lossesCount);
		}
	 });
	
		$(".rps-button").on("click", function(){
			console.log('in here');
			$(".select").html(this.id);
			playerChoice = this.id;
			
			// Add this value to Firebase

			
					
			var pickRef =  playerRef.child(playerNum);
			pickRef.update({ pick: playerChoice});
		});

	
			
			playerRef.on("child_added", function(snapshot) {
			  console.log(snapshot.key);
				
			  if (snapshot.val().playerName !== playerName) {
				playerNum = 2;	
								
			  } else {
				 opponent = snapshot.val();
			 }
			});
	
		
//		function winner() {
//			database.ref().on("value", function(snapshot) {
//      
//			player1Pick = snapshot.val().players.1.pick;
//				console.log(player1Pick);
//			player2Pick = snapshot.val().players.2.pick;
//				console.log(player2Pick);
//				
////			if (snapshot.val().players.1.pick)
//		
//    		}, function(errorObject) {
//      		console.log("The read failed: " + errorObject.code);
//			});
//			
//				if ((player1Pick === "rock") || (player1Pick === "paper") || (player1Pick === "scissors")) {
//
//				  if ((player1Pick === "rock") && (player2Pick === "scissors")) {
//					  if (playerChoice === player1Pick) {
//						  $(".winner").html("You won"); 
//					  } else {$(".winner").html("You lost"); } 
//						
//				  }
//				  else if ((player1Pick === "rock") && (player2Pick === "paper")) {
//					if (playerChoice === player2Pick) {
//						  $(".winner").html("You won"); 
//					  } else { $(".winner").html("You lost"); } 
//				  }
//				  else if ((player1Pick === "scissors") && (player2Pick === "rock")) {
//					 if (playerChoice === player2Pick) {
//						  $(".winner").html("You won"); 
//					  } else {$(".winner").html("You lost"); } 
//				  }
//				  else if ((player1Pick === "scissors") && (player2Pick === "paper")) {
//						if (playerChoice === player1Pick) {
//							  $(".winner").html("You won"); 
//						  } else {$(".winner").html("You lost"); } 
//				  }
//				  else if ((player1Pick === "paper") && (player2Pick === "rock")) {
//						if (playerChoice === player2Pick) {
//						  $(".winner").html("You won"); 
//					  } else {$(".winner").html("You lost"); } 
//				  }
//				  else if ((player1Pick === "paper") && (player2Pick === "scissors")) {
//					 	if (playerChoice === player2Pick) {
//						  $(".winner").html("You won"); 
//					  } else {$(".winner").html("You lost"); } 
//				  }
//				  else if (player1Pick === player2Pick) {
//						$(".winner").html("It's tie");
//				  }
//			}
//		}
//	
//	
//	winner(); 

});