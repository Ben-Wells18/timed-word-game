/* To do list: 
Attempt to add a high score keeper */



// global variables

// Available levels
const levels = {
	easy: 5,
	medium: 3,
	hard: 2
}

// To change level
let currentLevel = levels.easy; 


let time = currentLevel;
let score = 0;
let isPlaying;

// DOM variables
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
let seconds = document.querySelector("#seconds");
const easyButton = document.querySelector("#easyBtn");
const medButton = document.querySelector("#medBtn");
const hardButton = document.querySelector("#hardBtn");

//mode button functionality
easyButton.addEventListener("click", function(){
	currentLevel = levels.easy;
	easyButton.classList.add("selected");
	medButton.classList.remove("selected");
	hardButton.classList.remove("selected");
	seconds.innerHTML = 5;
});

medButton.addEventListener("click", function(){
	currentLevel = levels.medium;
	medButton.classList.add("selected");
	easyButton.classList.remove("selected");
	hardButton.classList.remove("selected");
	seconds.innerHTML = 3;
});

hardButton.addEventListener("click", function(){
	currentLevel = levels.hard;
	hardButton.classList.add("selected");
	medButton.classList.remove("selected");
	easyButton.classList.remove("selected");
	seconds.innerHTML = 2;
});


// Words array
var words = [
	"hat",
	"dog",
	"cardboard",
	"hotdog",
	"bubbles",
	"cocktail",
	"cheeseburger",
	"lead",
	"drums",
	"developer",
	"river",
	"resident",
	"style",
	"boom",
	"horoscope",
	"loop",
	"communication",
	"undermine",
	"notebook",
	"print",
	"force",
	"hand",
	"tear",
	"magic",
	"javascript",
	"universal",
	"cylinder",
	"desk",
	"glasses",
	"contradict"
];
// Function that occurs when the page is loaded
// Ensurses random word is chosen when the page loads *MUST COME AFTER WORDS ARRAY* 
window.addEventListener("load", init());

// Initialise Game
function init(){
	// number of seconds reflects difficulty
	seconds.innerHTML = currentLevel;
	// load word from array
	showWord(words);
	// start matching on word input
	wordInput.addEventListener("input", startMatch);
	// call countDown every second
	setInterval(countDown, 1000);
	// Checks game status
	setInterval(checkStatus, 50);
	// Ensures user knows easy is selected by default
	easyButton.classList.add("selected");
}

// startMatch function
function startMatch() {
	if(matchWords()) {
	isPlaying = true;
	time = currentLevel + 1; // sets the intial time
	showWord(words);
	wordInput.value = ""; //resets the user input after a match
	score++; //increments the score
	}

// If score is -1 automaticcaly replaces it with 0
	if (score === -1) {
		scoreDisplay.innerHTML = 0;
	} else {
		scoreDisplay.innerHTML = score;
	}
}	

// matches current word to user input
function matchWords(){
	if(wordInput.value === currentWord.innerHTML) {
		message.innerHTML = "Correct!";
		return true;
	} else {
		message.innerHTML = "";
		return false;
	}
}

// Picks and shows a random word
function showWord(words) {
	// Generates a random array index
	const randIndex = Math.floor(Math.random() * words.length);
	// Output a random word
	currentWord.innerHTML = words[randIndex];

}

// Countdown timer
function countDown() {
	//Ensure time hasn't run out
	if(time > 0) {
		//Decrement
		time--
	} else if(time === 0) {
		isPlaying = false;
	}
	//Shows current time
	timeDisplay.innerHTML = time;
}

//Check game status function
function checkStatus() {
	if(!isPlaying && time ===0) {
		message.innerHTML = "Game Over!";
		score = -1; //ensures user does not get a point upon the starting word
	}
}