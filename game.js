
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  $("#start-game").css("display", "none");
  startGame();
});

$(".start-btn").click(function () {
  $("#start-game").css("display", "none");
  startGame();
});

$(".btn").click(buttonClicked); // detecting btn clicked by user

//  BTN Clicked
function buttonClicked() {
  var userChosenColour = this.id; // selectimg color id
  userClickedPattern.push(userChosenColour); //adding choosen color to array

  playSound(userChosenColour); //sound
  animatePress(userChosenColour); // animation

  checkAnswer(userClickedPattern.length - 1); // checking Answer
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}
// start game
function startGame() {
  // Starting Game
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}
//  Next Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // Generating random number
  var randomChosenColour = buttonColours[randomNumber]; // choosing random colour

  gamePattern.push(randomChosenColour); // setting game pattern

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100); // flashing animation on buttons
  playSound(randomChosenColour); // play sound
}

// Play sound for selected btn
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}
// Animate Button Pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
} 
// Game Over 
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");

  $("#level-title").html("Game Over ❌");
  $("#start-title").html("<br> Press any key to <br> Restart");
  $(".start-btn").text("Restart");
  $("#start-game").css("display", "block");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 500);

  level = 0;
  gamePattern = [];
  started = false;
}
