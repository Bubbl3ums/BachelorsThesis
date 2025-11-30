// This code was adapted from https://github.com/tmlbl/nback

// Size the grid to the window on load

$(document).ready(function() {
	var loadwidth = $(window).height();
	loadwidth *= 0.50;
	$('table').css({'width': loadwidth + 'px'});
	$('table').css({'height': loadwidth + 'px'});
});

// Resize grid if window is resized

$(window).resize(function() {
	var dynwidth = $(window).height();
	dynwidth *= 0.50;
	$('table').css({'width': dynwidth + 'px'});
	$('table').css({'height': dynwidth + 'px'});
});

//Have instructions pop up when first loading the page
window.onload = function() {
	$('#instruct').css({'display': 'block'}); 
};

// Show and hide instructions when prompted (a feature no longer used in the current form)

$('#info').on('click', function() {
	$('#instruct').css({'display': 'block'});
});

$('#close').on('click', function() {
	if (blockRunning === false) {
		playBlock();
	}
	blockRunning = true;
	setTimeout(function() {
		blockRunning = false;
	}, 20000); 
	$('#instruct').css({'display': 'none'});
});

$('#resultclose').on("click", function() {
	if (blockRunning === false) {
		playBlock();
	}
	blockRunning = true;
	setTimeout(function() {
		blockRunning = false;
	}, 20000); 
	$('#resultswindow').css({'display': 'none'});
});


// Value of N at the start of the experiment
var n = 1;


// PREPARE BLOCK FUNCTION

function prepareBlock(n) {

	// Empty block array

	var thisBlock = [];

	// Populate thisBlock with [0, 0] pairs

	for (var i = 0; i < 40 + n; i++) { //decides the total amount of trials
		thisBlock.push([0, 0]);
	}

	// Get the length of the block

	var blockLength = thisBlock.length;

	// Create 4 visual targets in empty spots

	var visuals = 0;
	while (visuals < 8) {
		var visTarg = Math.floor(Math.random() * blockLength);
		if (thisBlock[visTarg + n]) {
			if (thisBlock[visTarg][0] == 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] == 0 && thisBlock[visTarg + n][1] == 0) {
				thisBlock[visTarg][0] = 1 + Math.floor(Math.random() * 8);
				thisBlock[visTarg + n][0] = thisBlock[visTarg][0];
				visuals++;
			} else if (thisBlock[visTarg][0] !== 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] == 0 && thisBlock[visTarg + n][1] == 0) {
				thisBlock[visTarg + n][0] = thisBlock[visTarg][0];
				visuals++;
			} else if (thisBlock[visTarg][0] == 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] !== 0 && thisBlock[visTarg + n][1] == 0) {
				thisBlock[visTarg][0] = thisBlock[visTarg + n][0];
				visuals++;
			} else {
				continue;
			}
		} else {
			continue;
		}
	}

	// Create 2 dual targets in empty spots

	var doubles = 0;
	var visualRuns = 0;
	while (doubles < 4) {
		var dualTarg = Math.floor(Math.random() * blockLength);
		visualRuns++;
		if (thisBlock[dualTarg + n]) {
			if (thisBlock[dualTarg][0] == 0 && thisBlock[dualTarg][1] == 0 && thisBlock[dualTarg + n][0] == 0 && thisBlock[dualTarg + n][1] == 0) {
				thisBlock[dualTarg][0] = 1 + Math.floor(Math.random() * 8);
				thisBlock[dualTarg][1] = 1 + Math.floor(Math.random() * 8);
				thisBlock[dualTarg + n] = thisBlock[dualTarg];
				doubles++;
			} else {
				if (visualRuns > 1000) {
					break;
				} else {
					continue;
				}
			}
		} else {
			continue;
		}
	}

	// Fill other values with random, non-matching values

	for (var x = 0; x < blockLength; x++) {
		if (thisBlock[x][0] == 0) {
			thisBlock[x][0] = 1 + Math.floor(Math.random() * 8);
			if (thisBlock[x - n] && thisBlock[x][0] === thisBlock[x - n][0] && thisBlock[x] !== thisBlock[x - n]) {
				if (thisBlock[x][0] < 8) {
					thisBlock[x][0] += 1;
				} else {
					thisBlock[x][0] -= 1;
				}
			} else if (thisBlock[x + n] && thisBlock[x][0] === thisBlock[x + n][0] && thisBlock[x] !== thisBlock[x + n]) {
				if (thisBlock[x][0] < 8) {
					thisBlock[x][0] += 1;
				} else {
					thisBlock[x][0] -= 1;
				}
			}
		}
	}

	return thisBlock;
};

// END PREPARE BLOCK FUNCTION

// EVALUATE BLOCK FUNCTION

function evaluateBlock(block) {
	var vTargCount = 0;
	for (var i = 0; i < block.length; i++) {
		if (block[i - n]) {
			if (block[i][0] == block[i - n][0]) {
				vTargCount += 1;
			}
		}
	}
	return [vTargCount];
}

// Function to light up specified square

var sqrMaker = function(randSqr) {
	switch (randSqr) {
		case 1:
			$('#uno').toggleClass('on');
			setTimeout(function() { $('#uno').toggleClass('on') }, 500);
			break;
		case 2:
			$('#dos').toggleClass('on');
			setTimeout(function() { $('#dos').toggleClass('on') }, 500);
			break;
		case 3:
			$('#tres').toggleClass('on');
			setTimeout(function() { $('#tres').toggleClass('on') }, 500);
			break;
		case 4:
			$('#cuatro').toggleClass('on');
			setTimeout(function() { $('#cuatro').toggleClass('on') }, 500);
			break;
		case 5:
			$('#seis').toggleClass('on');
			setTimeout(function() { $('#seis').toggleClass('on') }, 500);
			break;
		case 6:
			$('#siete').toggleClass('on');
			setTimeout(function() { $('#siete').toggleClass('on') }, 500);
			break;
		case 7:
			$('#ocho').toggleClass('on');
			setTimeout(function() { $('#ocho').toggleClass('on') }, 500);
			break;
		case 8:
			$('#nueve').toggleClass('on');
			setTimeout(function() { $('#nueve').toggleClass('on') }, 500);
			break;
	}
};

// Global variable for user score

var userScore = [0, 0, 0]; // true positive, false negative, false positive
var totalReactionTP = 0; //all reaction time for True Positives added up to be divided later 
var totalReactionFP = 0; 
var startTime; //needed to calculate the reaction time
var currentTime;

// MAIN GAME FUNCTION

function playBlock() {
	var currentBlock = prepareBlock(n);
	var blockEval = evaluateBlock(currentBlock);
	while (blockEval[0] != 12) { //how many positive cases there are
		currentBlock = prepareBlock(n);
		blockEval = evaluateBlock(currentBlock);
	}
	var blockCounter = -1; //since the first block can never be a target
	var thisBlockLength = currentBlock.length;
	var hitsThisValue = [0];
	playValue();
	function playValue() {

		$('html').on('keydown', function(event) { 
			if (event.which == 65) { //where it registers the A button

				if (currentTime == 0){
					var d = new Date();
					currentTime = d.getTime() - startTime; //measures the time elapsed since the block first showed up
				}
				hitsThisValue[0] = 1;
			}
		});
		//Keeps going with showing blocks if the total number hasnt been reached yet
		if (++blockCounter < thisBlockLength) {
			if (blockCounter > n && currentBlock[blockCounter]) {
				if (currentBlock[blockCounter - 1][0] == currentBlock[blockCounter - n - 1][0]) {
					if (hitsThisValue[0] > 0) { //adds one to the tally of correct responses when a reponse was required (true positive tally)
						userScore[0] += 1;
						totalReactionTP += currentTime; //adds reaction time per square to total reaction time, only for true positives
						
					} else {
						userScore[1] += 1; //false negative tally
					}
				} else {
					if (hitsThisValue[0] > 0) { //false positive tally
						userScore[2] += 1;
						totalReactionFP += currentTime; //adds the reaction time per square to total reaction time, for false positives 
					}
				}
			}

			currentTime = 0;  

			if (currentBlock[blockCounter]) {
				var d = new Date();
				startTime = d.getTime(); //gets time when the block appears

				sqrMaker(currentBlock[blockCounter][0]);
			}
			console.log('this block: ' + currentBlock[blockCounter]);
			console.log('keypresses: ' + hitsThisValue);
			console.log('current score: ' + userScore);
			setTimeout(playValue, 3000); //the time between the blocks appearing is 3000 ms
			hitsThisValue = [0];
		} else {
			if (n == 1){
				$('#resultswindow').css({'display': 'block'});      //shows confirmation message, and moves on to 2-back
				$('#resultstitle').html('1-back complete!'); 
				//message shown after completing the 1-back
				$('#results').html('In the next task you will have to remember the location of the square two before the current square instead of one before. For example, if the first square is in the top right corner, the second square is at the bottom middle and the third square is in the top right corner again, you press the "A-button". If the third square is in a different location, you do not press any buttons. This task is more challenging than the previous one, so please try to focus as well as you can. Press the button below when you are ready to start.'); 

				localStorage.setItem("oneback_tp", userScore[0]); //stores 1-back scores in localstorage
				localStorage.setItem("oneback_fn", userScore[1]);
				localStorage.setItem("oneback_fp", userScore[2]);

				localStorage.setItem("oneback_avgRT_TP", totalReactionTP/(userScore[0] > 0 ? userScore[0] : 1));
				localStorage.setItem("oneback_avgRT_FP", totalReactionFP/(userScore[2] > 0 ? userScore[2] : 1));


				userScore = [0, 0, 0]; //reset userscore for the 2-back
				totalReactionTP = 0; 
				totalReactionFP = 0; 
				n = 2 //sets n-back to 2 for the next iteration
			}
			else{
				$('#resultswindow').css({'display': 'block'});      
				$('#resultclose').css({'display': 'none'});      
				$('#resultstitle').html('Experiment complete!'); 
				$('#results').html('Your results have been saved! You can now return to the questionnaire and can safely close this page.'); 
				localStorage.setItem("twoback_tp", userScore[0]); //stores 2-back scores in localstorage
				localStorage.setItem("twoback_fn", userScore[1]);
				localStorage.setItem("twoback_fp", userScore[2]);

				localStorage.setItem("twoback_avgRT_TP", totalReactionTP/(userScore[0] > 0 ? userScore[0] : 1));
				localStorage.setItem("twoback_avgRT_FP", totalReactionFP/(userScore[2] > 0 ? userScore[2] : 1));

				totalReactionTP = 0; 
				totalReactionFP = 0; 

				sendData("n-back")
			}
		}
	}
}

// When the button is clicked, run a block

var blockRunning = false;

$('#begin').css({'display': 'none'}); 
$('#info').css({'display': 'none'}); 

$('#begin').click(function() {
	if (blockRunning === false) {
		playBlock();
	}
	blockRunning = true;
	setTimeout(function() {
		blockRunning = false;
	}, 20000); 
})