import { gameVars } from "../play.js";
import {
  readyThrowGui,
  changeGuiText,
  enableGui,
  writeRandomDialogue,
} from "./gui.js";
import { playerThrowDice, clearDices } from "./dices.js";
import { shrinkBack, playerMove, playerMoveBack, setPlayerExpression } from "./characters.js";
import { checkWhoCallEffects, outCallEffects } from './call-effects.js';
import { callEnterSFX, callOutSFX, playDiceReadySFX } from "./sfx.js";

const staticUrl = "./";
let callScreenButton = document.getElementById("call-screen-button");
let callButton = document.getElementById("call-button");

export let call = document.getElementById('call');
let callInitialAnimation = 'floating-call 2s ease-in-out infinite';

export const callName = [
    'The Lost',        // ☑ Permanent DiceUp ; get damaged x 3 
    'Judas',           // ☑ playerDmg += 5 ; get damaged x 2
    'Keeper',          // ☑ 1/3 chance of random effects
    'Isaac',           // ☑ playerMana += diceValue
    'Bumbo',           // ☑ 1/2 chance +1 diceValue 
    'Cain',            // ☑ 1/2 chance of +(1 to 12) dmg
    'Super Bumbo!?'    // ☑ Bumbo + Cain effects on 1/3 chance + mana regen
];                     // ☑ :)

callButton.addEventListener("click", () => {
  if (gameVars.canAction) {
    if (!gameVars.hasCall) {
      playDiceReadySFX();
      readyThrowGui();
      shrinkBack(true, false);
      setPlayerExpression("ready");
    } else {
      shrinkBack(true, true);
      readyThrowGui('¡Click para despedir!');
    }
    gameVars.canAction = false;
    setTimeout(() => {
      callScreenButton.style.display = "block";
    }, 250);
  }
});

callScreenButton.addEventListener("click", () => {
  if (gameVars.canCall && !gameVars.hasCall) {
    callScreenButton.style.display = "none";
    callThrowDice();
    setTimeout(checkWhoCall, 1000);

  } else if (gameVars.canCall && gameVars.hasCall) {
    callScreenButton.style.display = "none";
    gameVars.hasCall = false;
    outCall();

  }
  gameVars.canCall = false;
});

function callThrowDice(diceCount) {
  playerThrowDice(diceCount);
}

function checkWhoCall() {
  let playerDiceValue = parseInt(document.getElementById("player-current-dice").dataset.value);
  gameVars.callNum = playerDiceValue;
  call.setAttribute('data-who', playerDiceValue);

  changeGuiText( `Llamaste a ${callName[playerDiceValue - 1]}!`);
  enterCall(playerDiceValue);
  setTimeout(playerMove, 250);
  checkWhoCallEffects(playerDiceValue);

  document.getElementById("player-current-dice").id = "";
}

function enterCall (who = 5) {
  let setInitialTransition = () => { call.style.transition = 'all 0.5s linear'; };
  let setSlowTransition = () => { call.style.transition = 'all 0.75s ease-out'; };

  call.src = staticUrl + `bumbweb_game/sprites/calls/call-${who}-side.png`;
  setSlowTransition();
  call.style.right = '75%';
  callEnterSFX();
  setTimeout(() => {
    call.src = staticUrl + `bumbweb_game/sprites/calls/call-${who}.png`;
    setInitialTransition();
    gameVars.hasCall = true;
  }, 1000);
  
  setTimeout(() => {
    finishCall();
  }, 2000);
}

function outCall () {
  let setInitialTransition = () => { call.style.transition = 'right 0.5s linear, transform 0.15s ease-in-out'; };
  let setFastTransition = () => { call.style.transition = 'transform 0.25s ease-in-out'; };
  let setSlowTransition = () => { call.style.transition = 'right 0.75s linear'; };
  
  let who = parseInt(call.dataset.who);
  outCallEffects(who);

  call.src = staticUrl + `bumbweb_game/sprites/calls/call-${who}-side.png`;
  call.style.animation = 'none';

  setTimeout(() => {
    setFastTransition();
    call.style.transform = 'scaleX(-1)';
  }, 0);
  setTimeout(() => {
    setSlowTransition();
    call.style.right = '150%';
  }, 350);

  let message = `Nos vemos, ${callName[who - 1]}!`;
  changeGuiText(message);
  gameVars.callNum = NaN;
  callOutSFX();

  setTimeout(playerMoveBack, 250);
  setTimeout(() => {
    setInitialTransition();
    call.style.animation = callInitialAnimation;
    call.style.transform = 'none';
    finishCall();
  }, 1500);
}

function finishCall () {
  clearDices();
  enableGui();
  changeGuiText();
  setTimeout(writeRandomDialogue, 750);
  setTimeout(() => {
    gameVars.canAction = true;
  }, 1000);
}