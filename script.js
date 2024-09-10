'use strict'
// list of available choices
const choices = ['rock', 'paper', 'scissors']

// Get computer's choice
function getComputerChoice() {
  let selectedChoice = choices[Math.floor(Math.random() * 3)]
  return selectedChoice
}
// Get the human's choice
function getHumanChoice() {
  let selectedChoice

  while (true) {
    selectedChoice = prompt(
      'Enter Your choice (rock, paper, and scissors):'
    ).toLocaleLowerCase()

    if (choices.includes(selectedChoice)) {
      break
    } else {
      console.log('Invalid choice! Try agin.')
    }
  }
  return selectedChoice
}

// play a round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`It's a tie! Both are ${humanChoice}`)
    return 'tie'
  }

  if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice == 'paper')
  ) {
    console.log(`You win! ${humanChoice} beats ${computerChoice}`)
    return 'human'
  } else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`)
    return 'computer'
  }
}

function playGame() {
  let humanScore = 0
  let computerScore = 0

  for (let i = 0; i < 5; i++) {
    let humanSelection = getHumanChoice()
    let computerSelection = getComputerChoice()
    let result = playRound(humanSelection, computerSelection)

    if (result === 'human') {
      humanScore++
    } else if (result === 'computer') {
      computerScore++
    }
  }

  console.log('Final Score')
  console.log('Your score: ' + humanScore)
  console.log('Computer score: ' + computerScore)
}

playGame()
