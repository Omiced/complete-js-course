"use strict";
//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//Starting conditions
let scores;
let currentScore;
let playing;
let activePlayer;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
};
init();
const switchPlayer = function () {
  !activePlayer ? (current0El.textContent = 0) : (current1El.textContent = 0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.- generate a random roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.- display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3.- check for rolling 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      !activePlayer
        ? (current0El.textContent = currentScore)
        : (current1El.textContent = currentScore);
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    !activePlayer
      ? (score0El.textContent = scores[0])
      : (score1El.textContent = scores[1]);
    //check if player's score >= 100
    //finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
