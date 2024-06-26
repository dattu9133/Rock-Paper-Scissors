let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();


let intervalID;
let isAutoPlay = false;
function autoPlay() {
  if (!isAutoPlay) {
    document.querySelector('.autoPlay').innerHTML = 'Stop Auto Play';
    intervalID = setInterval(() => playGame(pickComputerMove()), 1000);
    isAutoPlay = true;
  }
  else {
    isAutoPlay = false;
    document.querySelector('.autoPlay').innerHTML = 'Auto Play';
    clearInterval(intervalID);
  }
}

document.querySelector('.rock-button').addEventListener('click', () => playGame('rock'));
document.querySelector('.paper-button').addEventListener('click', () => playGame('paper'));
document.querySelector('.scissors-button').addEventListener('click', () => playGame('scissors'));


document.body.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() == 'r')
    playGame('rock');
  else if (event.key.toLowerCase() == 'p')
    playGame('paper');
  else if (event.key.toLowerCase() == 's') {
    playGame('scissors');
  }
  else if (event.key.toLowerCase() == 'a') {
    autoPlay();
  }
  else if (event.key == 'Backspace') {
    document.querySelector('.confirm').innerHTML =
      `Are you sure you want to reset?
      <button onclick="document.querySelector('.confirm').innerHTML = '';
      resetScore();" class="mx-3 reset-score">Yes</button>      
      <button class="reset-score" onclick="document.querySelector('.confirm').innerHTML = '';">No</button>`;

  }

  else {
    return;
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
    You 
    <img class="emoji" src="assests\\image\\${playerMove}-emoji.png" alt="playerMove">
    <img class="emoji" src="assests\\image\\${computerMove}-emoji.png" alt="computerMove"> Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}
