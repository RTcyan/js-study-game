'use strict'

const Start = document.querySelector('#start');
const Game = document.querySelector('#game');
const Time = document.querySelector('#time');
const TimeInput = document.querySelector('#game-time');
const ResultHeader = document.querySelector('#result-header');
const TimeHeader = document.querySelector('#time-header');

let score = 0;

Start.addEventListener('click', startgame);

TimeInput.addEventListener('input', function(event) {
    TimeHeader.classList.remove('hide');
    ResultHeader.classList.add('hide');
    let timeFromInput = event.target.value || 5;
    Time.textContent = timeFromInput >=5 ? timeFromInput : 5;
});

function startgame() {
    TimeHeader.classList.remove('hide');
    TimeInput.setAttribute('disabled', 'true');
    ResultHeader.classList.add('hide');
    Start.classList.add('hide');
    Game.style.backgroundColor = '#fff';

    let timeFromInput = TimeInput.value || 5;
    Time.textContent = timeFromInput >=5 ? timeFromInput : 5;

    let interval = setInterval(function() {
        let time = parseFloat(Time.textContent);

        if(time <= 0){
            endGame();
            clearInterval(interval);
        } else {
            Time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);

    renderBox();
    Game.addEventListener('click', handleBoxClick);
}

function endGame() {
    Game.innerHTML = '';
    Start.classList.remove('hide');
    TimeHeader.classList.add('hide');
    ResultHeader.classList.remove('hide');
    document.querySelector('#result').textContent = score;
    score = 0;
    Game.style.backgroundColor = '#ccc';
    TimeInput.removeAttribute('disabled');
}

function renderBox() {
    Game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandomInt(30,100);
    let gameSize = Game.getBoundingClientRect();
    let top = getRandomInt(0,gameSize.height - boxSize);
    let left = getRandomInt(0,gameSize.width - boxSize);

    box.style.width = `${boxSize}px`;
    box.style.height = box.style.width;
    box.style.position = 'absolute';
    box.style.backgroundColor = getRandomColor();
    box.style.top = top + 'px';
    box.style.left = left + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true')

    Game.insertAdjacentElement('afterbegin', box);
}

function handleBoxClick(event){
    let target = event.target;
    if(target.dataset.box){
        score++;
        renderBox();
    }
}

function getRandomInt(min, max){
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function getRandomColor() {
    const arraySimbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let colorSting = '';
    for (let index = 0; index < 6; index++) {
        colorSting += arraySimbols[getRandomInt(0, arraySimbols.length - 1)]; 
    }

    if (colorSting === 'ffffff') {
        colorSting = getRandomColor();
    }

    return '#' + colorSting;
}