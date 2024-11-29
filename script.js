"use strict";

const choices = ["rock", "paper", "scissors"];

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const overlayResultDisplay = document.querySelector(".overlay-result-display");
const choicesContainer = document.querySelector(".choices");
const overlay = document.querySelector(".overlay");
const playerScoreDisplay = document.querySelector(".player-score-display");
const computerScoreDisplay = document.querySelector(".computer-score-display");
const tryAgainButton = document.querySelector(".try-again-button");

let mainResultDisplay = document.querySelector(".main-result-display");

let computerScore = 0;
let playerScore = 0;

choicesContainer.addEventListener("click", (e) => {
  let button = e.target
    .getAttribute("class")
    .slice(0, e.target.getAttribute("class").indexOf("-"));

  if (button !== "choice") {
    let playerMadeChoiceEvent = new CustomEvent("player-made-choice", {
      detail: {
        playerChoice: button,
        computerChoice: choices[Math.floor(Math.random() * 3)],
      },
    });

    document.dispatchEvent(playerMadeChoiceEvent);
  }
});

document.addEventListener("player-made-choice", (event) => {
  updateChoices(event.detail.playerChoice, event.detail.computerChoice);

  let winner = getWinner(
    event.detail.playerChoice,
    event.detail.computerChoice
  );

  updateScores(winner);
  announceWinner(playerScore, computerScore);
});

tryAgainButton.addEventListener("click", () => {
  tryAgainButton.parentNode.classList.toggle("show-overlay");

  clearData();
});

function updateChoices(pChoice, cChoice) {
  playerDisplay.textContent = "PLAYER: " + pChoice;
  computerDisplay.textContent = "COMPUTER: " + cChoice;
}

function getWinner(pChoice, cChoice) {
  if (pChoice === cChoice) {
    return "tie";
  } else if (
    (pChoice === "rock" && cChoice === "scissors") ||
    (pChoice === "scissors" && cChoice === "paper") ||
    (pChoice === "paper" && cChoice === "rock")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function updateScores(winner) {
  if (winner === "player") {
    mainResultDisplay.textContent = "You won!";
    playerScore++;

    playerScoreDisplay.textContent = "Player Score: " + playerScore;
  } else if (winner === "computer") {
    mainResultDisplay.textContent = "Computer won!!";
    computerScore++;

    computerScoreDisplay.textContent = "Computer Score: " + computerScore;
  } else mainResultDisplay.textContent = "It's a tie!";
}

function announceWinner(pScore, cScore) {
  if (pScore === 5) {
    overlayResultDisplay.textContent = "YOU WIN! 🫵";
    overlay.classList.toggle("show-overlay");
  }
  if (cScore === 5) {
    overlayResultDisplay.textContent = "YOU LOST! 🤦";
    overlay.classList.toggle("show-overlay");
  }
}

function clearData() {
  playerDisplay.textContent = "PLAYER:";
  computerDisplay.textContent = "COMPUTER:";

  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = "Player Score: 0";
  computerScoreDisplay.textContent = "Computer Score: 0";

  mainResultDisplay.textContent = "";
}
