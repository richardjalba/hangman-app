import { sound } from './../data/sound.js';
import Home from './home.js';

const How = (() => {
  // Cache DOM
  const $hangman = document.querySelector('.hangman');

  const init = (_) => {
    render();
    listeners();
  };

  const listeners = () => {
    document
      .querySelector('.hangman__trigger')
      .addEventListener('click', () => {
        sound.click.play();
        HTMLFormElement.init();
      });
  };

  const render = () => {
    let markup = `
    <h1 class="hangman__title">Instructions</h1>
    <ul class="how">
    <li>This will be done someday, probably not...</li>
    </ul>
    <button class="button hangman__trigger">Main Menu</button>
    `;

    $hangman.innerHTML = markup;
  };

  return {
    init,
  };
})();

export default How;
