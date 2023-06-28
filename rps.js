const choices = document.getElementsByClassName('choice');
const winsSpan = document.getElementById('wins');
const lossesSpan = document.getElementById('losses');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.getElementsByClassName('close')[0];
const playAgainButton = document.getElementById('play-again');
let playerChoice = '';
let wins = 0;
let losses = 0;

function getPlayerChoice(choice) {
  playerChoice = choice;
  playGame();
}

function getComputerChoice() {
  const computerChoiceIndex = Math.floor(Math.random() * 3);
  const choices = ['rock', 'paper', 'scissors'];
  return choices[computerChoiceIndex];
}

function playGame() {
  const computerChoice = getComputerChoice();
  const gameResult = determineWinner(playerChoice, computerChoice);

  const computerChoiceImg = new Image();
  computerChoiceImg.src = `img/${computerChoice}.png`;
  computerChoiceImg.alt = computerChoice;
  computerChoiceImg.className = 'computer-choice-img';

  const computerChoiceText = document.createElement('div');
  computerChoiceText.className = 'computer-choice-text';
  computerChoiceText.textContent = "Computer's Choice:";

  const resultMessage = document.createElement('div');
  resultMessage.className = 'result';
  resultMessage.textContent = gameResult;

  modalMessage.innerHTML = '';
  modalMessage.appendChild(computerChoiceText);
  modalMessage.appendChild(computerChoiceImg);
  modalMessage.appendChild(resultMessage);

  modal.style.display = 'block';

  if (gameResult === 'You win!') {
    wins++;
    winsSpan.textContent = wins;
    resultMessage.style.color = 'green';
  } else if (gameResult === 'You lose!') {
    losses++;
    lossesSpan.textContent = losses;
    resultMessage.style.color = 'red';
  } else {
    resultMessage.style.color = 'orange';
  }
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'Tie!';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}

function closeModalHandler() {
  modal.style.display = 'none';
}

function playAgainHandler() {
  modal.style.display = 'none';
  playerChoice = '';
  const choiceButtons = document.querySelectorAll('.choice-button');
  choiceButtons.forEach(button => {
    button.addEventListener('click', makeChoice);
  });
  document.addEventListener('keydown', closeModalOnEnter);
}

closeModal.addEventListener('click', closeModalHandler);
playAgainButton.addEventListener('click', playAgainHandler);

for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener('click', function () {
    getPlayerChoice(choices[i].querySelector('button').id);
  });
}
