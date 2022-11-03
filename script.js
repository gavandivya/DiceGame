'use strict';
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player1Score = document.querySelector('#score--1');
const player2Score = document.querySelector('#score--2');
const player1CurrentScore = document.querySelector('#current--1');
const player2CurrentScore = document.querySelector('#current--2');
const player1Active = document.querySelector('.player--1');
const player2Active = document.querySelector('.player--2');
const Name1 = document.querySelector('#name--0');
const Name2 = document.querySelector('#name--1');
const playersName = prompt("Please enter comma seperated 2 Players names").split(',');

let curScore, activePlayer, score;

const init = function () {
    curScore = 0;
    activePlayer = 1;
    score = [0, 0];
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player2Active.classList.remove('player--active');
    player1Active.classList.add('player--active');
    dice.classList.add('hidden');
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1CurrentScore.textContent = 0;
    player2CurrentScore.textContent = 0;
}

init();

//handing prompt input names of two players
Name1.textContent = playersName[0].length == 0 ? "Player 1" : playersName[0];
Name2.textContent = playersName[1].length == 0 ? "Player 2" : playersName[1];

function switchPlayer() {
    curScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    player1Active.classList.toggle('player--active');
    player2Active.classList.toggle('player--active');
}

//Rolling Dice
btnRoll.addEventListener('click', function Roll() {
    dice.classList.remove('hidden');
    const SelectedDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${SelectedDice}.png`
    if (SelectedDice !== 1) {
        curScore = curScore + SelectedDice;
        document.getElementById(`current--${activePlayer}`).textContent = curScore;
    }
    else {
        switchPlayer();
        console.info(score);
    }
})


//Holding Score
btnHold.addEventListener('click', function () {
    score[activePlayer - 1] = score[activePlayer - 1] + curScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer - 1];
    if (score[activePlayer - 1] >= 20) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
        dice.classList.add('hidden');
        btnRoll.style.display = 'none'
        btnHold.style.display = 'none'
    }
    else {
        switchPlayer();
    }
})

//Start New Game
btnNew.addEventListener('click', function () {
    btnRoll.style.display = 'block'
    btnHold.style.display = 'block'
    init();
})
