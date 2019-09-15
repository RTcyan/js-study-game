/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
const start = document.querySelector('#start');
const game = document.querySelector('#game');

start.addEventListener('click', startgame);


function startgame() {
  start.classList.add('hide');
  game.style.backgroundColor = '#fff';
  renderBox();
}

function renderBox() {
  const box = document.createElement('dic');

  box.style.width = '50px';
  box.style.height = box.style.width;
  box.style.position = 'absolute';
  box.style.backgroundColor = '#000';

  game.insertAdjacentElement('afterbegin', box);
}
