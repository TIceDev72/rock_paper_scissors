"use strict";
const choices = ["rock", "paper", "scissors"];

// Get computer's choice
function getComputerChoice() {
  let selectedChoice = choices[Math.floor(Math.random() * 3)];
  return selectedChoice;
}

// Get the human's choice
function getHumanChoice() {
  let result;

  while (true) {
    result = prompt(
      "Enter Your choice (rock, paper, and scissors):"
    ).toLowerCase();

    if (choices.includes(result)) {
      break;
    } else {
      console.log("Invalid choice! Try agin.");
    }
  }
  return result;
}

// play a round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`Tie! Both are ${humanChoice}`);
    return "tie";
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice == "paper")
  ) {
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    return "human";
  } else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    return "computer";
  }
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let i = 0, n = 5; i < n; i++) {
    let humanSelection = getHumanChoice();
    let computerSelection = getComputerChoice();
    let result = playRound(humanSelection, computerSelection);

    if (result === "tie") {
      ++n;
      continue;
    } else if (result === "computer") {
      ++computerScore;
    } else {
      ++humanScore;
    }
  }

  console.log(
    `Final Score:\n
    Your score: ${humanScore}\n
    Computer score: ${computerScore} `
  );
}

playGame();
