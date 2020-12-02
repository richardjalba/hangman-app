import Home from './home.js';
import End from './end.js';
import { sound } from '../data/sound.js';

const Game = (() => {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const words = ['apple', 'ball', 'dolphin', 'cat', 'dog', 'elephant', 'jazz'];
  let chosenWord;
  let guessingWord;
  let lives;
  let guesses;

  // Cache DOM
  const $hangman = document.querySelector('.hangman');

  const init = (_) => {
    chosenWord = chooseWord();
    guessingWord = Array(chosenWord.length).fill('_');
    guesses = [];
    lives = 7;
    showInitPage();
    listeners();
  };

  const listeners = () => {
    $hangman.addEventListener('click', (event) => {
      if (event.targer.matches('.hangman__letter')) {
        sound.click.play();
        check(event.target.innerHTML);
      }

      if (event.target.matches('.hangman__trigger')) {
        sound.click.play();
        Home.init();
      }
    });
  };

  const isAlreadyTaken = (letter) => {
    return guesses.includes(letter);
  };

  const check = (guess) => {
    if (isAlreadyTaken(guess)) return;

    guesses.push(guess);

    if (chosenWord.includes(guess)) {
      updateGuessingWord(guess);
    } else {
      lives--;
      //
    }
    render();
    //
    isGameOver();
  };

  const hasWon = () => guessingWord.join('') === chosenWord;
  const hasLost = () => lives <= 0;

  const isGameOver = () => {
    if (hasWon()) {
      sound.win.play();
      End.setState({
        chosenWord,
        result: 'win',
      });
    }

    if (hasLost()) {
      sound.win.play();
      End.setState({
        chosenWord,
        result: 'lost',
      });
    }
  };

  const render = () => {
    document.querySelector('.hangman__lives').innerHTML = lives;
    document.querySelector('.hangman__word').innerHTML = guessingWord.join('');
    document.querySelector('.hangman__letters').innerHTML = createLetters();
  };

  const updateGuessingWord = (letter) => {
    chosenWord.split('').forEach((elem, index) => {
      if (elem === letter) {
        guessingWord[index] = elem;
      }
    });
  };

  const showInitPage = () => {
    let markup = `
      <p class="hangman__stats">Lives Remaining:
      <span class="hangman__lives>${lives}</span>
      </p>
      <h1 class="hangman__title">Hangman</h1>
      <canvas class="hangman__board" height="155px"></canvas>
      <div class="hangman__word">${guessingWord.join('')}</div>
      <p class="hangman__instructions">Pick a letter below to uncover the word.</p>
      <ul class="hangman__letters">
        ${createLetters()}
      </ul>
      <button class="button hangman__trigger">Main Menu<button>
      `;

    $hangman.innerHTML = markup;
  };

  const createLetters = () => {
    let markup = ``;
    letters.forEach((letter) => {
      const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
      markup += `
          <li class="hangman__letter ${isActive}">${letter}</li>
          `;
    });
    return markup;
  };

  const chooseWord = () => {
    let randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  };

  return {
    init,
  };
})();

export default Game;
