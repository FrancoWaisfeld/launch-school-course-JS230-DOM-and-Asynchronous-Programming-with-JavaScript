class WordGame {
  constructor() {
    this.words = ['banana', 'pear', 'apple', 'orange'];
    this.randomWord(); // initializes this.word to a random word
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
    this.lettersRemaining = Array(this.word.length).fill('');
    this.guessesLimit = 6;
  }

  randomWord() {
    let randomIndex = Math.floor(Math.random() * this.words.length);

    this.word = this.words.splice(randomIndex, 1)[0];

    return this.word;
  }

  resetRound() {
    this.randomWord();

    if (this.outOfWords()) {
      return;
    }

    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
    this.lettersRemaining = Array(this.word.length).fill('');
  }

  guess(letter) {
    letter = letter.toLowerCase();
    let indexes = this.#getAllIndexesFromWord(letter);

    if (this.lettersGuessed.includes(letter)) {
      return;
    } else if (indexes.length === 0) {
      this.incorrectGuesses += 1;
    } else {
      for (let index of indexes) {
        this.lettersRemaining[index] = letter;
      }
    }

    this.lettersGuessed.push(letter);
  }

  isGameLost() {
    return this.incorrectGuesses >= this.guessesLimit;
  }

  isGameWon() {
    return this.lettersRemaining.join('') === this.word;
  }

  outOfWords() {
    return !this.word;
  }

  #getAllIndexesFromWord(letter) {
    let indexes = [];
    let letters = this.word.split('');
    letters.forEach((letter2, index) => {
      if (letter === letter2) {
        indexes.push(index);
      }
    });

    return indexes;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let game = new WordGame;
  let spaces = document.querySelector('#spaces');
  let guesses = document.querySelector('#guesses');
  let replayLink = document.querySelector('#replay');
  let message = document.querySelector('#message');

  function appendSpanElements(letters, parentElement) {
    letters.forEach(letter => {
      let span = document.createElement('span');
      span.textContent = letter;
      parentElement.appendChild(span);
    });
  }

  function keepNChildElements(parentElement, count) {
    while (parentElement.children.length > count) {
      parentElement.removeChild(parentElement.lastElementChild);
    }
  }

  function handleKeyup(event) {
    let letter = event.key;
    if (letter.match(/[a-zA-Z]/) && letter.length === 1) {
      game.guess(letter);
    }

    keepNChildElements(guesses, 1);
    keepNChildElements(spaces, 1);

    appendSpanElements(game.lettersGuessed, guesses);
    appendSpanElements(game.lettersRemaining, spaces);

    let messageContent;
    let gameWon = game.isGameWon();
    let gameLost = game.isGameLost();

    if (gameWon || gameLost) {
      document.removeEventListener('keyup', handleKeyup);
      replayLink.classList.add('visible');

      if (gameWon) {
        document.body.classList.add('win');
        messageContent = 'You win!'
      } else if (gameLost) {
        document.body.classList.add('lose');
        messageContent = 'Sorry! You\'re out of guesses.'
      }

      message.textContent = messageContent;
    }
  }

  appendSpanElements(game.lettersRemaining, spaces);

  document.addEventListener('keyup', handleKeyup);

  replayLink.addEventListener('click', event => {
    event.preventDefault();

    game.resetRound();

    if (game.outOfWords()) {
      message.textContent = 'Sorry, I\'ve run out of words!';
      document.removeEventListener('keyup', handleKeyup);
    } else {
      replayLink.classList.remove('visible');
      document.body.classList.remove('win');
      document.body.classList.remove('lose');
      message.textContent = '';
      keepNChildElements(guesses, 1);
      keepNChildElements(spaces, 1);
      appendSpanElements(game.lettersGuessed, guesses);
      appendSpanElements(game.lettersRemaining, spaces);
      document.addEventListener('keyup', handleKeyup);
    }
  });
});