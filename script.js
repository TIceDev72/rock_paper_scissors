"use strict";

const choices = ["rock", "paper", "scissors"];

const gameStartDialogBox = document.querySelector(".dialog-box");
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const overlayResultDisplay = document.querySelector(".overlay-result-display");
const choicesContainer = document.querySelector(".choices");
const overlay = document.querySelector(".overlay");
const playerScoreDisplay = document.querySelector(".player-score-display");
const computerScoreDisplay = document.querySelector(".computer-score-display");
const playAgainButton = document.querySelector(".play-again-button");
const fetchingDataMessage = document.querySelector(".computer-mesg");
const mainResultDisplay = document.querySelector(".main-result-display");

let computerScore = 0;
let playerScore = 0;

// Show a dialog box when page loads or is refreshed
gameStartDialogBox.addEventListener("click", (button) => {
  let buttonClicked = button.target.getAttribute("class");

  // Remove dialog box and overlay if Yes is clicked
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

  if (!choices.includes(buttonClicked)) return;

  fetchingDataMessage.textContent = "Computer is deciding...";

  // Prevents buttons from being interacted with while the pc is deciding
  choicesContainer.style.pointerEvents = "none";

  setTimeout(() => {
    fetchingDataMessage.textContent = "";

    let playerMadeChoiceEvent = new CustomEvent("player-made-choice", {
      detail: {
        playerChoice: buttonClicked,
        computerChoice: choices[Math.floor(Math.random() * 3)],
      },
    });

    document.dispatchEvent(playerMadeChoiceEvent);

    // Makes buttons interactive once more
    choicesContainer.style.pointerEvents = "auto";
  }, 1000);
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

playAgainButton.addEventListener("click", () => {
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
    mainResultDisplay.textContent = "You won this Round!!";
    playerScore++;

    playerScoreDisplay.textContent = "Player Score: " + playerScore;
  } else if (winner === "computer") {
    mainResultDisplay.textContent = "Computer won this Round!!";
    computerScore++;

    computerScoreDisplay.textContent = "Computer Score: " + computerScore;
  } else mainResultDisplay.textContent = "It's a tie!";

  setTimeout(() => {
    mainResultDisplay.textContent = "";
  }, 900);
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
