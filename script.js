'use strict'
function getComputerChoice() {
  const choiceList = ['rock', 'paper', 'scissors']
  let computerChoice = choiceList[Math.floor(Math.random() * 3)]
  return computerChoice
}

function getHumanChoice() {
  let humanChoice = prompt(
    'Enter any of the following choices\n(rock, paper, and scissors):'
  )
  return humanChoice
}

function playRound(humanChoice, computerChoice) {
  let lowerCaseHumChoice = humanChoice.toLowerCase()
  switch (lowerCaseHumChoice) {
    case 'rock':
      if (computerChoice !== lowerCaseHumChoice && computerChoice !== 'paper') {
        console.log(`You won! ${humanChoice} beats ${computerChoice}`)
        ++humanScore
      } else if (computerChoice === lowerCaseHumChoice) {
        console.log(
          `It's a tie!\nYour choice "${humanChoice}" and pc's choice "${computerChoice}" are thesame.`
        )
      } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}. Pc Won!`)
        ++computerScore
      }
      break
    case 'paper':
      if (
        computerChoice !== lowerCaseHumChoice &&
        computerChoice !== 'scissors'
      ) {
        console.log(`You won! ${humanChoice} beats ${computerChoice}`)
        ++humanScore
      } else if (computerChoice === lowerCaseHumChoice) {
        console.log(
          `It's a tie!\nYour choice "${humanChoice}" and pc's choice "${computerChoice}" are thesame.`
        )
      } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}. Pc Won!`)
        ++computerScore
      }
      break
    case 'scissors':
      if (computerChoice !== lowerCaseHumChoice && computerChoice !== 'rock') {
        console.log(`You won! ${humanChoice} beats ${computerChoice}`)
        ++humanScore
      } else if (computerChoice === lowerCaseHumChoice) {
        console.log(
          `It's a tie!\nYour choice "${humanChoice}" and pc's choice "${computerChoice}" are thesame.`
        )
      } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}. Pc Won!`)
        ++computerScore
      }
      break
  }
}

let humanScore = 0
let computerScore = 0

const humanSelection = getHumanChoice()
const computerSelection = getComputerChoice()

playRound(humanSelection, computerSelection)

console.log('Your score is: ' + humanScore)
console.log('Computer score is: ' + computerScore)
