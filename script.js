"use strict";

const choices = ["rock", "paper", "scissors"];

const gameStartDialogBox = document.querySelector(
  ".game-start-overlay .dialog-box"
);
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const overlayResultDisplay = document.querySelector(".overlay-result-display");
const choicesContainer = document.querySelector(".choices");
const overlay = document.querySelector(".overlay");
const playerScoreDisplay = document.querySelector(".player-score-display");
const computerScoreDisplay = document.querySelector(".computer-score-display");
const tryAgainButton = document.querySelector(".try-again-button");
const fetchingDataMessage = document.querySelector(".computer-mesg");

let mainResultDisplay = document.querySelector(".main-result-display");

let computerScore = 0;
let playerScore = 0;

// Show a dialog box when page loads or is refreshed
gameStartDialogBox.addEventListener("click", (button) => {
  let buttonClicked = button.target.getAttribute("class");

  // If yes is clicked remove dialog box and overlay
  if (buttonClicked === "yes-button") {
    gameStartDialogBox.parentNode.remove();
    // Else insert the error code in the in the HTML body tag
  } else if (buttonClicked === "no-button") {
    document.body.innerHTML = `<code> Game cancelled! Refresh your browser to play game.</code>`;
  }
});

// Dispatch an event to the document object if any button is clicked
choicesContainer.addEventListener("click", (button) => {
  let buttonClicked = button.target.getAttribute("class");

  fetchingDataMessage.textContent = "Computer is deciding...";
  setTimeout(() => {
    fetchingDataMessage.textContent = "";

    if (!choices.includes(buttonClicked)) return;

    let playerMadeChoiceEvent = new CustomEvent("player-made-choice", {
      detail: {
        playerChoice: buttonClicked,
        computerChoice: choices[Math.floor(Math.random() * 3)],
      },
    });

    document.dispatchEvent(playerMadeChoiceEvent);
  }, 200);
});

// Call functions to update different parts of the game
document.addEventListener("player-made-choice", (event) => {
  let [playerSelection, computerSelection] = [
    event.detail.playerChoice,
    event.detail.computerChoice,
  ];

  updateChoices(playerSelection, computerSelection);

  let winner = getWinner(playerSelection, computerSelection);

  updateScores(winner);
  announceWinner(playerScore, computerScore);
});

tryAgainButton.addEventListener("click", () => {
  overlay.classList.toggle("show-overlay");

  clearData();
});

function updateChoices(pSelection, cSelection) {
  playerDisplay.textContent = "PLAYER: " + pSelection;
  computerDisplay.textContent = "COMPUTER: " + cSelection;
}

function getWinner(pSelection, cSelection) {
  if (pSelection === cSelection) {
    return "tie";
  } else if (
    (pSelection === "rock" && cSelection === "scissors") ||
    (pSelection === "scissors" && cSelection === "paper") ||
    (pSelection === "paper" && cSelection === "rock")
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
  if (pScore >= 5) {
    overlayResultDisplay.textContent = "YOU WIN! 🫵";
    overlay.classList.toggle("show-overlay");
  } else if (cScore >= 5) {
    overlayResultDisplay.textContent = "YOU LOST! 🤦";
    overlay.classList.toggle("show-overlay");
  } else if (pScore >= 5 && cScore >= 5) {
    overlayResultDisplay.textContent = "--DRAW--";
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
