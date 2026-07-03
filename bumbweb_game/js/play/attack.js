import { game, gameElements, gameVars } from "../play.js";
import {
  readyThrowGui,
  changeGuiText,
  enableGui,
  writeRandomDialogue,
} from "./gui.js";
import {
  playerThrowDice,
  enemyThrowDice,
  clearDices,
  clearDiceRow,
  playerDices,
  enemyDices,
  clearDice,
} from "./dices.js";
import { stats, labels, updateStatLabels, checkEnd } from "./stats.js"
import { shrinkBack, setPlayerExpression, setEnemyExpression, setCallExpression } from "./characters.js";
import {
  throwDiceEffectChance,
  checkValuesCallEffects,
  callDamageAplifier,
} from "./call-effects.js";
import { callName } from "./call.js";
import { damageSFX, playDiceReadySFX } from "./sfx.js";

const attackScreenButton = document.getElementById("attack-screen-button");
const attackButton = document.getElementById("attack-button");

let stackedDices = false;
let diceCount = 0;

attackButton.addEventListener("click", () => {
  if (gameVars.canAction) {
    if (gameVars.hasCall) {throwDiceEffectChance();};
    gameVars.canAction = false;
    gameVars.hasCall ? shrinkBack(true, true) : shrinkBack(true, false);
    shrinkBack(false);
    readyThrowGui();
    playDiceReadySFX();
    gameVars.hasCall ? setCallExpression("ready") : setPlayerExpression("ready");
    setEnemyExpression("ready");
    setTimeout(() => {
      attackScreenButton.style.display = "block";
    }, 250);
  }
});

attackScreenButton.addEventListener("click", () => {
  attackScreenButton.style.display = "none";
  attackThrowDices(diceCount);
  setTimeout(checkValues, 1250);
});

export function attackThrowDices (diceCount) {
  playerThrowDice(diceCount);
  enemyThrowDice(diceCount);
  diceCount++;
}

export function checkValues (
  damaging = true,
  elseAction = null,
  elseDisplay = null) {
  let playerCurrentDice = document.getElementById("player-current-dice");
  let enemyCurrentDice = document.getElementById("enemy-current-dice");
  playerCurrentDice && (playerCurrentDice.id = "");
  enemyCurrentDice && (enemyCurrentDice.id = "");
  
  let playerDiceValue;
  let enemyDiceValue = parseInt(enemyCurrentDice.dataset.value);
  if (playerCurrentDice.dataset.value === 'CAT') {
    playerDiceValue = enemyDiceValue;
  } else if (playerCurrentDice.dataset.value === 'SP-EFFECT') {
    if (playerCurrentDice.dataset.effect === 'REDUCE') {
      playerDiceValue = enemyDiceValue - 1;
    } else if (playerCurrentDice.dataset.effect === 'EXPAND') {
      playerDiceValue = enemyDiceValue + 1;
    }
  } else {
    playerDiceValue = parseInt(playerCurrentDice.dataset.value);
  }

  let multiplier;
  if (!stackedDices) {
    if (playerDiceValue > enemyDiceValue) {   // win
      if (gameVars.hasCall) {checkValuesCallEffects(playerDiceValue, true);}
      else {stats.playerMana += Math.floor(playerDiceValue / 2);}
      multiplier = playerDiceValue - enemyDiceValue;
      damaging ? doDamage(true, multiplier) : elseAction();
      damaging ? displayResult(true, multiplier) : elseDisplay();
      setTimeout(finishAttack, 2000);

    } else if (playerDiceValue < enemyDiceValue) {   // lose
      if (gameVars.hasCall) {checkValuesCallEffects(playerDiceValue, false);}
      multiplier = enemyDiceValue - playerDiceValue;
      damaging ? doDamage(false, multiplier) : elseAction();
      damaging ? displayResult(false, multiplier) : elseDisplay();
      setTimeout(finishAttack, 2000);
      
    } else if (playerDiceValue === enemyDiceValue) {   // draw
      stackedDices = true;
      diceCount++;
      gameVars.hasCall ? setCallExpression("ready") : setPlayerExpression("ready");
      setEnemyExpression("ready");
      setTimeout(() => {
        attackThrowDices(diceCount);
      }, 500);
      setTimeout(checkValues, 1000);
    }
  } else {

    if (playerDiceValue > enemyDiceValue) {   // win
      if (gameVars.hasCall) {checkValuesCallEffects(playerDiceValue, true);};
      setTimeout(() => {
        drawAttack(true, diceCount);
      }, 1000);

    } else if (playerDiceValue < enemyDiceValue) {   // lose
      if (gameVars.hasCall) {checkValuesCallEffects(playerDiceValue, false);};
      setTimeout(() => {
        drawAttack(false, diceCount);
      }, 1000);

    } else if (playerDiceValue === enemyDiceValue) {   // draw
      diceCount++;
      setTimeout(() => {attackThrowDices(diceCount);}, 750);
      setTimeout(checkValues, 1200);
    }
  }
}

function drawAttack(playerWin = true, diceCount) {
  for (let i = diceCount; i >= 0; i--) {
    let multiplier;
    if (i === diceCount) {   // first iteration
      let playerDice = parseInt(playerDices.querySelector(`[data-order="${i}"]`).dataset.value);
      let enemyDice = parseInt(enemyDices.querySelector(`[data-order="${i}"]`).dataset.value);
      if (playerWin) {multiplier = playerDice - enemyDice;}
      else if (!playerWin) {multiplier = enemyDice - playerDice;}
    } else { multiplier = 1;}

    setTimeout(() => {   // damaging code ;-;
      if ((stats.playerHp <= 0) || (stats.enemyHp <= 0)) return;
      displayResult(playerWin, multiplier);
      doDamage(playerWin, multiplier);
      clearDiceRow(i);
      diceCount--;

      if (i === 0) {   // last iteration
        setTimeout(finishAttack, 1000);
      }
    }, (diceCount - i) * 2000);
  }
}

export function doDamage(playerWin = true, multiplier = 1) {
  let damage;

  if (playerWin) {
    damage = stats.playerDmg * multiplier;
    damage = callDamageAplifier(true, damage);
    stats.enemyHp -= damage;
    setTimeout(() => {setEnemyExpression("hurt");}, 500);
    setTimeout(() => {setEnemyExpression("normal");}, 2000);

  } else {
    damage = stats.enemyDmg * multiplier;
    damage = callDamageAplifier(false, damage);
    stats.playerHp -= damage;
    setTimeout(() => {setPlayerExpression("hurt");}, 500);
    setTimeout(() => {setPlayerExpression("normal");}, 2000);
    if (gameVars.hasCall) {
      setTimeout(() => {setCallExpression("hurt");}, 500);
      setTimeout(() => {setCallExpression("normal");}, 2000);
    }
  }
  setTimeout(updateStatLabels, 500);
  setTimeout(shakeGameElements, 500);
  setTimeout(checkEnd, 750);
}

export function displayResult(playerWin = true, multiplier = 1) {
  let result;

  if (playerWin) {
    result = `Haces x${multiplier} daño!`;
    if (gameVars.hasCall) {
      if (gameVars.cainHelp) {
        result = `Haces x${multiplier} daño! (+${gameVars.cainHelpValue}) por ${callName[gameVars.callNum - 1]}`;
      }
    }

  } else {
    result = `Recibes x${multiplier} daño!`;

    if (gameVars.hasCall) {
      let amplifier;
      gameVars.callNum === 1 && (amplifier = 3);
      gameVars.callNum === 2 && (amplifier = 2);
      if (amplifier) {
        result += ` (x${amplifier} por ${callName[gameVars.callNum - 1]})`;
      } else if (gameVars.cainHelp) {
        result += ` (-${gameVars.cainHelpValue} por ${callName[gameVars.callNum - 1]})`;
      }
    }
  }

  changeGuiText(result);
}

export function shakeGameElements() {
  damageSFX();
  gameElements.style.animation = "shake-screen 0.25s ease-out 3";
  setTimeout(() => {
    gameElements.style.animation = "none";
  }, 751);
}

function finishAttack() {
  if ((stats.playerHp <= 0) || (stats.enemyHp <= 0)) {return;}
  gameVars.canCall = true;
  gameVars.cainHelp = false;
  gameVars.cainHelpValue = 0;
  gameVars.keeperEffect = 0;
  gameVars.keeperDiceText = "";
  stackedDices = false;
  diceCount = 0;
  clearDices();
  enableGui();
  changeGuiText();
  setTimeout(writeRandomDialogue, 750);
  setTimeout(() => {
    gameVars.canAction = true;
  }, 1000);
}
