import { gameVars } from '../play.js';
import { growBack, setPlayerExpression, setEnemyExpression, setCallExpression } from './characters.js';
import { theLostEffect, keeperEffect } from './call-effects.js';
import { playDicePlusOneValueSFX, playDiceThrowSFX } from './sfx.js';

const staticUrl = window.location.pathname.includes('/bumbweb-html5')
  ? window.location.origin + '/bumbweb-html5/'
  : './';
export const playerDices = document.getElementById("player-dices-relative");
export const enemyDices = document.getElementById("enemy-dices");


export function playerThrowDice(diceCount = 0) {
  let playerNewDice = document.createElement("img");
  playerNewDice.classList.add("dice");
  playerNewDice.id = "player-current-dice";
  playerNewDice.src = staticUrl + "bumbweb_game/sprites/dices/d-roll.gif";
  playerNewDice.style.willChange = "bottom, right";
  playerNewDice.style.bottom = "43%";
  playerNewDice.style.right = "56%";
  playerNewDice.style.height = "0";
  playerNewDice.style.width = "0";
  playerNewDice.style.animation = "fly-dice 100ms linear infinite";
  gameVars.hasCall ? setCallExpression("throw") : setPlayerExpression("throw");

  if (gameVars.hasCall) {growBack(true, true);}
  else {growBack(true, false);}
  playDiceThrowSFX();
  function raf () {return new Promise(r => requestAnimationFrame(r));}
  raf().then(() => {
    playerDices.appendChild(playerNewDice);
    setTimeout(() => {
      playerNewDice.style.height = "12%";
      playerNewDice.style.width = "auto";
      return setPlayerDice(diceCount);
    }, 1);
  });
}

export function enemyThrowDice(diceCount = 0) {
  let enemyNewDice = document.createElement("img");
  enemyNewDice.classList.add("dice");
  enemyNewDice.id = "enemy-current-dice";
  enemyNewDice.src = staticUrl + "bumbweb_game/sprites/dices/d-roll.gif";
  enemyNewDice.style.willChange = "bottom, left";
  enemyNewDice.style.bottom = "43%";
  enemyNewDice.style.left = "56%";
  enemyNewDice.style.height = "0";
  enemyNewDice.style.width = "0";
  enemyNewDice.style.animation = "fly-dice 100ms linear infinite";
  setEnemyExpression("throw");

  growBack(false);
  setTimeout(playDiceThrowSFX, 75);
  function raf () {return new Promise(r => requestAnimationFrame(r));}
  raf().then(() => {
    enemyDices.appendChild(enemyNewDice);
    setTimeout(() => {
      enemyNewDice.style.height = "12%";
      enemyNewDice.style.width = "auto";
      return setEnemyDice(diceCount);
    }, 1);
  });
}

function setPlayerDice(diceCount = 0) {
  let playerDice = document.getElementById("player-current-dice");
  let playerDiceValue = getRandomDiceValue();
  if (gameVars.hasCall) theLostEffect();
  if (gameVars.nextDicePlusOneValue) playerDiceValue += 1;

  playerDice.setAttribute('data-value', playerDiceValue);
  playerDice.setAttribute('data-order', diceCount);

  playerDice.style.bottom = "75%";
  playerDice.style.right = "21%";
  setTimeout(() => {
    playerDice.style.bottom = calculateDiceBottom(diceCount);
    playerDice.style.right = "0%";
    setTimeout(() => {playerDice.style.willChange = "";});
  }, 250);
  
  setTimeout(() => {
    playerDice.style.animation = "none";
    playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d${playerDiceValue}.png`;
    
    if (gameVars.nextDicePlusOneValue && ![1,2,3].includes(gameVars.keeperEffect)) {
      playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d${playerDiceValue-1}.png`;
      setTimeout(() => {
        playerDice.style.animation = "up-valued 0.5s ease-in-out 1 none";
        playDicePlusOneValueSFX();
        setTimeout(() => {
          playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d${playerDiceValue}.png`;
        }, 300);
      }, 200);
      gameVars.nextDicePlusOneValue = false;

    } else if (!gameVars.nextDicePlusOneValue && [1,2,3].includes(gameVars.keeperEffect)) {
      keeperEffect(playerDice, playerDiceValue);
      gameVars.keeperEffect = 0;

    } else if (gameVars.nextDicePlusOneValue && [1,2,3].includes(gameVars.keeperEffect)) {
      playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d${playerDiceValue-1}.png`;
      setTimeout(() => {
        playerDice.style.animation = "up-valued 0.5s ease-in-out 1 none";
        setTimeout(() => {
          playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d${playerDiceValue}.png`;
        }, 300);
      }, 200);
      gameVars.nextDicePlusOneValue = false;
      gameVars.keeperEffect = 0;
    }
  }, 500);
  setTimeout(() => {
    setPlayerExpression("normal");
    gameVars.hasCall && setCallExpression("normal");
  }, 500);
  return playerDiceValue;
}

function setEnemyDice(diceCount = 0) {
  let enemyDice = document.getElementById("enemy-current-dice");
  let enemyDiceValue = getRandomDiceValue();
  enemyDice.setAttribute('data-value', enemyDiceValue);
  enemyDice.setAttribute('data-order', diceCount);

  enemyDice.style.bottom = "75%";
  enemyDice.style.left = "21%";
  setTimeout(() => {
    enemyDice.style.bottom = calculateDiceBottom(diceCount);
    enemyDice.style.left = "0%";
    setTimeout(() => {enemyDice.style.willChange = "";});
  }, 250);
  setTimeout(() => {
    enemyDice.style.animation = "none";
    enemyDice.src = staticUrl + `bumbweb_game/sprites/dices/d${enemyDiceValue}.png`;
  }, 500);
  setTimeout(() => {setEnemyExpression("normal");}, 500);
  return enemyDiceValue;
}

function getRandomDiceValue() {
  let randomValue = Math.floor(Math.random() * 6) + 1;
  return randomValue;
}

function calculateDiceBottom(diceCount = 0) {
  let baseBottomPercent = 42;
  let diceHeightPercent = 12;

  let diceBottomPercent = baseBottomPercent + diceHeightPercent * diceCount;

  return `${diceBottomPercent}%`;
}

export function clearDices() {
  document.getElementById("player-dices-relative").innerHTML = "";
  document.getElementById("enemy-dices").innerHTML = "";
  game.style.animation = "";
}

export function clearDiceRow (order) {
  playerDices.querySelector(`[data-order="${order}"]`).remove();
  enemyDices.querySelector(`[data-order="${order}"]`).remove();
}

export function clearDice (playerDice = true, order) {
  if (playerDice) {
    playerDices.querySelector(`[data-order="${order}"]`).remove();
  } else {
    enemyDices.querySelector(`[data-order="${order}"]`).remove();
  }
  
}

export function getCurrentDiceValue(player=true) {
  let currentDiceValue;
  if (player) {
    currentDiceValue = document.getElementById("player-current-dice").dataset.value;
  } else {
    currentDiceValue = document.getElementById("enemy-current-dice").dataset.value;
  }
  return parseInt(currentDiceValue);
}