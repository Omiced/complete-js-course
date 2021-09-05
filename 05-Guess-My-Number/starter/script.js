"use strict ";
let secretNumber = Math.trunc(Math.random() * 21);
let score = 20;
let highScore = 0;
const messageText = document.querySelector(".message");
const displayMessage = function (message) {
  messageText.textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  // when there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");
  } else if (guess === secretNumber) {
    // player win
    displayMessage("🎉 Correct number!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    //Guess wrong
    if (score > 1) {
      score--;
      document.querySelector(".score").textContent = score;
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
    } else {
      document.querySelector(".score").textContent = 0;
      displayMessage("💥 You lost the game!");
    }
  }
});

//reset the game
document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 21);
  score = 20;
  document.querySelector(".score").textContent = 20;
  displayMessage("Start guessing...");
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});
