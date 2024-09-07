document.addEventListener('DOMContentLoaded', () => {
  let guessInput = document.querySelector('#guess');
  let form = document.querySelector('form');
  let newGameLink = document.querySelector('a');
  let paragraph = document.querySelector('p');
  let answer;

  function newGame () {
    answer = Math.floor(Math.random() * 99) - 1;
    guesses = 0;
    paragraph.textContent = 'Guess a number from 1 to 100';
  }


  form.addEventListener('submit', event => {
    event.preventDefault();

    let guess = parseInt(guessInput.value, 10);
    let message;

    if (guess === answer) {
      message = 'You guessed it!';
    } else if (guess > answer) {
      message = `My number is lower than ${String(guess)}`;
    } else {
      message = `My number is higher than ${String(guess)}`;
    }

    paragraph.textContent = message;
  });

  newGameLink.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  })

  newGame();
});
