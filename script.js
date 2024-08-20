"use strict"
function getComputerChoice() {
  const choiceList = ["rock", "paper", "scissors"]
  let computerChoice = choiceList[Math.floor(Math.random() * 3)]
  return computerChoice
}

function getHumanChoice() {
  let humanChoice = prompt("Enter Your choice:")
  return humanChoice
}

let humanScore = 0
let computerScore = 0

function playRound(humanChoice, computerChoice) {}
