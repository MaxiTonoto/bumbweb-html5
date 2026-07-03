import { deleteGui } from './gui.js';
import { gameVars } from '../play.js';
import { playEurghSFX, playCallEurghSFX, fadeOutGameBGM } from './sfx.js';
import { playEnd, playLose } from '../play.js';

const STAT_RANGES = {
  playerHp   : [152, 382],
  playerMana : [32, 46],
  playerDmg  : [7, 21],
  enemyHp    : [186, 412],
  enemyDmg   : [9, 25],
};
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateInitialStats() {
  return {
    playerHp   : randomInt(...STAT_RANGES.playerHp),
    playerMana : randomInt(...STAT_RANGES.playerMana),
    playerDmg  : randomInt(...STAT_RANGES.playerDmg),
    enemyHp    : randomInt(...STAT_RANGES.enemyHp),
    enemyDmg   : randomInt(...STAT_RANGES.enemyDmg),
    playerDmgUp: false,
  };
}

//  STATS
export let stats;

//  LABELS
export let labels = {
  playerHpLabel   : document.getElementById("player-hp-label"),
  playerDmgLabel  : document.getElementById("player-dmg-label"),
  playerManaLabel : document.getElementById("player-mana-label"),

  enemyHpLabel : document.getElementById("enemy-hp-label"),
}

const dataEls = {
  playerHp   : document.getElementById("player-hp"),
  playerMana : document.getElementById("player-mana"),
  playerDmg  : document.getElementById("player-dmg"),
  enemyHp    : document.getElementById("enemy-hp"),
  enemyDmg   : document.getElementById("enemy-dmg"),
};

function syncStatsToDataset() {
  dataEls.playerHp.dataset.playerHp     = stats.playerHp;
  dataEls.playerMana.dataset.playerMana = stats.playerMana;
  dataEls.playerDmg.dataset.playerDmg   = stats.playerDmg;
  dataEls.enemyHp.dataset.enemyHp       = stats.enemyHp;
  dataEls.enemyDmg.dataset.enemyDmg     = stats.enemyDmg;
}

//  FUNCTIONS
export function initStats() {
  stats = generateInitialStats();
  syncStatsToDataset();
  updateStatLabels();
}
export function updateStatLabels() {
  labels.playerHpLabel.innerText = stats.playerHp;
  labels.playerDmgLabel.innerText = stats.playerDmg;
  labels.playerManaLabel.innerText = stats.playerMana;
  labels.enemyHpLabel.innerText = stats.enemyHp + " HP";
}

export function heal(player=true, amount=0) {
  player? 
    stats.playerHp += amount :
    stats.enemyHp += amount;
  updateStatLabels();
}

// only runs once when loading the module
initStats();

export function decreaseMana(amount=0) {
  stats.playerMana -= amount;
  updateStatLabels();
}

let gui = document.getElementById('gui');
let player = document.getElementById('player');
let enemy = document.getElementById('enemy');
let call = document.getElementById('call');

export function checkEnd() {

  player.style.transition = 'opacity 0.5s ease-out';
  enemy.style.transition = 'opacity 0.5s ease-out';
  call.style.transition = 'opacity 0.5s ease-out';

  if (stats.playerHp <= 0) {
    fadeOutGameBGM();
    setTimeout(() => {deleteGui(true);}, 500);
    setTimeout(() => {
      player.style.opacity = 0;
      playEurghSFX(); 
      if (gameVars.hasCall) {
        call.style.opacity = 0;
        setTimeout(playCallEurghSFX, 100);
      }
    }, 2000);
    setTimeout(playLose, 4500);

  } else if (stats.enemyHp <= 0) {
    fadeOutGameBGM();
    setTimeout(() => {deleteGui(true);}, 500);
    setTimeout(() => {
      enemy.style.opacity = 0;
      playEurghSFX();
    }, 2000);
    setTimeout(playEnd, 4500);
    
  }
}