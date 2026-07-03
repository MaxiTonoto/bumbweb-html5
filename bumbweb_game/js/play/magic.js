import { gameVars } from "../play.js";
import {
  readyThrowGui,
  changeGuiText,
  enableGui,
  writeRandomDialogue,
  toggleMagicGui,
  showGameCaption,
  toggleLeftGui,
  disableGui,
  showFloatingCaption,
} from "./gui.js";
import { playerThrowDice, enemyThrowDice, clearDices, getCurrentDiceValue } from "./dices.js";
import { doDamage, displayResult, attackThrowDices, checkValues } from './attack.js';
import { stats, heal, decreaseMana } from './stats.js';
import { shrinkBack, setPlayerExpression, setCallExpression, setEnemyExpression } from "./characters.js";
import { throwDiceEffectChance } from './call-effects.js';
import { playDiceReadySFX, castBumboWinSFX, castValueppSFX, healSFX, castBreadCheeseSFX, openMagicMenuSFX, closeMagicMenuSFX } from './sfx.js';

let magicScreenButton = document.getElementById('magic-screen-button');
let magicButton = document.getElementById('magic-button');
let backButton = document.getElementById('player-back-button');

let manaCostText = document.getElementById('mana-cost');

const spellsDescriptions = [
  "👤🎲6? \n✅️ → 😈 = 💀 \n❌ → 👤 = 💀",
  "🎲n+1 \n😀👍",
  "🎲 🆚 🎲 \n👤✅️ → ❤️ + 🗡️*🎲 \n😈✅️ → 😈🗡️",
  "🎲 🆚 🎲 \n👤✅️ → 🗡️*🎲 \n😈✅️ → 🗡️*🎲"
];
let spells = document.querySelectorAll('.spell');
let spellDescriptionText = document.getElementById('play-text');

for (let i = 0; i < spells.length; i++) {  // hover descriptions
  spells[i].addEventListener('mouseover', () => {
    spellDescriptionText.innerText = spellsDescriptions[i];
    manaCostText.innerText = spells[i].dataset.manaCost;
  });

  spells[i].addEventListener('click', () => {
    // pass clicked spell id as param
    if (spells[i].dataset.manaCost <= stats.playerMana) {
      castSpell(spells[i].dataset.spellId);
      playDiceReadySFX();
    } else {
      showFloatingCaption();
    }
  })
}


magicButton.addEventListener('click', () => {
  if (gameVars.canAction) {
    openMagicMenuSFX();
    toggleMagicGui(true, false);
  }
});

magicScreenButton.addEventListener('click', () => {
  let currentSpellId = parseInt(magicScreenButton.dataset.castMagic);
  magicScreenButton.style.display = "none";

  switch (currentSpellId) {
    case 0:
      castBumbo();
      break;
  
    case 1:
      castValuepp();
      break;

    case 2:
      castOldBandage();
      break;

    case 3:
      castBreadCheese();
      break;
  }

});


backButton.addEventListener('click', () => {
  closeMagicMenuSFX();
  toggleMagicGui(false);
});


function castSpell(spellId) {
  let selectedSpellId = parseInt(spellId);
  let selectedSpell = document.querySelector(`[data-spell-id="${selectedSpellId}"]`);
  let selectedSpellManaCost = parseInt(selectedSpell.dataset.manaCost);
  
  if ((stats.playerMana >= selectedSpellManaCost) && (gameVars.canAction)) {
    if ((gameVars.callNum === 5) || (gameVars.callNum === 7)) {
      throwDiceEffectChance();
    }
    gameVars.canAction = false;
    magicScreenButton.dataset.castMagic = selectedSpellId;
    readyThrowGui("¡Click para hacer magia!");
    if (selectedSpellId !== 1) {
      gameVars.hasCall ? setCallExpression("ready") : setPlayerExpression("ready");
    }
    if (selectedSpellId === 2 || selectedSpellId === 3) setEnemyExpression("ready");
    setTimeout(() => {
      magicScreenButton.style.display = "block";
    }, 250);
  } else {
    showGameCaption();
  }
}

function castBumbo() {
  decreaseMana(document.getElementById('spell-bumbo').dataset.manaCost);

  let diceValue;
  playerThrowDice();

  setTimeout(() => {
    diceValue = getCurrentDiceValue(true);
    if (diceValue === 6) {
      doDamage(true, 999999);
      changeGuiText("¡Bummm(bo)!");
      castBumboWinSFX();
    } else {
      doDamage(false, 999999);
      changeGuiText("D:");
    }
    setTimeout(() => {
      clearDices();
      endSpellCast();
    }, 2000);
  }, 1000);
}

function castValuepp() {
  if (!gameVars.nextDicePlusOneValue) {
    decreaseMana(document.getElementById('spell-valuepp').dataset.manaCost);

    gameVars.nextDicePlusOneValue = true;
    disableGui();
    shrinkBack(true);
    changeGuiText("Tu proximo dado: ¡+1 en valor!");
    castValueppSFX();
    setTimeout(() => {endSpellCast();}, 2000);
  } else {
    disableGui();
    changeGuiText("Ya lo tenías ._.")
    setTimeout(() => {endSpellCast();}, 2000);
  }
}

function castOldBandage() {
  decreaseMana(document.getElementById('spell-old-bandage').dataset.manaCost);

  let playerDiceValue, enemyDiceValue;
  attackThrowDices();

  setTimeout(() => {
    playerDiceValue = getCurrentDiceValue(true);
    enemyDiceValue = getCurrentDiceValue(false);
    
    if (playerDiceValue > enemyDiceValue) {
      let diff = playerDiceValue - enemyDiceValue;
      changeGuiText(`Te curas tu DMG x${diff}!`);
      heal(true, (diff * stats.playerDmg));
      setTimeout(healSFX, 150);
    } else {
      changeGuiText("Recibes x1 daño!");
      doDamage(false, 1);
    }

    setTimeout(() => {
      clearDices();
      endSpellCast();
    }, 2000);

  }, 1000);

}

function castBreadCheese() {
  decreaseMana(document.getElementById('spell-bread-cheese').dataset.manaCost);
  let playerDiceValue, enemyDiceValue;
  attackThrowDices();

  setTimeout(() => {
    playerDiceValue = getCurrentDiceValue(true);
    enemyDiceValue = getCurrentDiceValue(false);
    
    if (playerDiceValue > enemyDiceValue) {
      displayResult(true, playerDiceValue);
      doDamage(true, playerDiceValue);
      setTimeout(castBreadCheeseSFX, 500);
    } else if (enemyDiceValue > playerDiceValue) {
      displayResult(false, enemyDiceValue);
      doDamage(false, enemyDiceValue);
      setTimeout(castBreadCheeseSFX, 500);
    } else {
      changeGuiText("No pasa nada 😐");
    }

    setTimeout(() => {
      clearDices();
      endSpellCast();
    }, 2000);
  }, 1000);

}

function endSpellCast() {
  gameVars.cainHelp = false;
  gameVars.cainHelpValue = 0;
  gameVars.keeperEffect = 0;
  gameVars.keeperDiceText = "";
  enableGui();
  toggleLeftGui(false);
  writeRandomDialogue();
  gameVars.canAction = true;
}