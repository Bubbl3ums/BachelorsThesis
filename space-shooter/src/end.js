/***********************************************
end.js : end of the game
***********************************************/

// last scene of the game
Crafty.scene('end', function() {
	var handler = Crafty.e('Delay');
	
	// destroy existing player and create a new
	var player = Crafty('Player');
	

	player.destroy();
	player = Crafty.e('Player');
	player.setEndLevelState();
	
	// move the player forward
	handler.delay(function(){
		player.tween({x: player.x, y: -50},2000);
	},1000);
	
	// show TO BE CONTINUED message
	handler.delay(function(){
		Crafty.e('CustomText').setTitle().text('THE&nbsp;&nbsp;&nbsp;END');
	},1750);
	
	// show THANKS FOR PLAYING message
	handler.delay(function(){
		Crafty.e('CustomText').setSubtitle().text('PLEASE&nbsp;&nbsp;&nbsp;RETURN&nbsp;&nbsp;&nbsp;TO&nbsp;&nbsp;&nbsp;THE&nbsp;&nbsp;&nbsp;QUESTIONNAIRE');
	},3500);
	
});
