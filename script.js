'use strict';

//selecting elements 
//hash is selector for id, dot is for class
//initialising variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0'); 
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//setting starter conditions

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
  
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  };
  init();

init();

const switchPlayer = function() {document.getElementById(`current--${activePlayer}`).textContent = 0;
activePlayer = activePlayer === 0 ? 1 : 0;
//this terniary operator above switches the players
player0El.classList.toggle('player--active');
player1El.classList.toggle('player--active');
};

//reacting to clicking the button and rolling the dice
btnRoll.addEventListener('click', function() {
    //this function should generate a random dice roll
    if (playing) {

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //and display the dice, you can do this by manipulating the image source to match the dice number

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check for a rolled 1

    if (dice !== 1) {
// add dice to current store
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        //switch to next player
        switchPlayer()
    }
}
})

btnHold.addEventListener('click', function() {
    if (playing) {
    //we want the player to move their score to the big score tag at the top and have it kept there

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //check score is already at least 100- finish game
    if (scores[activePlayer] >=  100) {
        playing = false;
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
        switchPlayer();
    }   
}
})

btnNew.addEventListener('click', init);