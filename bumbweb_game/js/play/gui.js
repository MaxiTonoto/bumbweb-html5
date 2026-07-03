import { gameVars } from "../play.js";
import { clearDiceRow, clearDices } from "./dices.js";
import { playTextAudio, playBattleBGM, openMagicMenuSFX, closeMagicMenuSFX } from "./sfx.js";

let guiText = document.getElementById("play-text");

let gameCaption = document.getElementById('game-caption');

let backLeftGui = document.getElementById('player-back-button');
let gui = document.getElementById('gui');
let guiCopy = null;
let guiLeft = document.getElementById('gui-left');
let guiRight = document.getElementById('gui-right');
let magicRightGui = document.getElementById('gui-right-magic');

let borderColor = 'rgb(33, 19, 120)';
let borderColorMagic = 'rgb(16, 89, 17)';

let callButton = document.getElementById("call-button");

let dialogues = [
  "¡Suerte, Bumbo!",
  "Bumbo!",
  "Bruh",
  "bruh",
  "Esto es horroroso de ver...",
  "Oh, no",
  "Está fuerte, eh",
  "Una cosa de locos",
  "Bumbo > Bumbino?",
  "¡Vamos, Bumbo!",
  "¡Vamos, Bumbo!",
  "¿Jugando de fondo, o a fondo jugando?",
  "Es cuestión de tener habilidad",
  "Qué suerte",
  "SE REMONTA",
  "Todavia puede ganarse",
  "Bumbo lo hace",
  "La ayuda es una ayuda",
  "Bumbo tira dado",
  "El proximo dado es bueno",
  "No confies en estos diálogos",
  "¿Problema de habilidad?",
  "ES TODO UN DESASTRE",
  "¿Te serviría llamar una ayuda?",
  "Piensa bien antes de hacer click",
  "Si tus dados son malos, mejora tu click",
  "Deberías curarte, pero sabrás mejor...",
  "Un pan queso ahora?",
  "Valor++ funciona con el dado de la llamada",
  "Valor++ funciona con los dados de magias",
  "Judas tiene mucho daño, pero es vulnerable",
  "The Lost tiene +1 valor de dado permanente",
  "Isaac recarga más maná",
  "Bumbo puede darte +1 valor de dado",
  "¡Keeper tiene muchos efectos!",
  "Hay 7 llamadas posibles, pero el dado va de 1 a 6...",
];

export function startGame() {

  let passingScreen = document.getElementById('intro-to-play');
  let gameScreen = document.getElementById('play');

  gameScreen.style.display = 'block';
  setTimeout(() => {
    passingScreen.style.opacity = 0;
  }, 1);
  setTimeout(() => {
    passingScreen.style.display = 'none';
  }, 250);
  setTimeout(showGui, 500);
  setTimeout(initButtons, 550);
  setTimeout(playBattleBGM, 550);
  setTimeout(() => {
    gameVars.canAction = true;
  }, 1500);
}

let writingText = "";
export function writeOnGui(text, guiText, i = 0) {
  if (i === 0) {   // empty start
    guiText.innerText = ""
    writingText = text;
  }
  if (text !== writingText) return;

  if (text[i] !== " " && gui.style.opacity === 1) {
    playTextAudio();
  }
  guiText.textContent += text[i]; // add current char

  if (i < text.length - 1) {   // if current char is not text's last char
    setTimeout(() => {  // write next char concurrently
      i++;
      writeOnGui(text, guiText, i);
    }, 45);
  }
}

export function writeRandomDialogue() {
  let randomDialogueIndex = Math.floor(Math.random() * dialogues.length);
  guiText.style.textAlign = 'left';
  writeOnGui(dialogues[randomDialogueIndex], guiText);
}

export function showGui() {
  gui.style.display = "flex";
  setTimeout(() => {
    gui.style.opacity = 1;
  }, 1);
  setTimeout(writeRandomDialogue, 500);
}

export function hideGui() {
  gui.style.opacity = 0;
  setTimeout(() => {
  gui.style.display = "none";
  }, 250);
}

export function initButtons() {
  let magicButton = document.getElementById('magic-button');
  let callButton = document.getElementById('call-button');
}

export function toggleLeftGui(hide=true) {
  if (hide) {
    guiLeft.style.width = 0;
    guiLeft.style.border = '0px';
  } else {
    guiLeft.style.width = '25%';
    guiLeft.style.border = 'solid var(--gui-border-size) var(--gui-border-color)';
  }
}
export function toggleBackButton(hide=true) {
  if (hide) {
    backLeftGui.style.borderWidth = '0px';
    backLeftGui.style.width = '0%';
    setTimeout(() => {
      backLeftGui.style.display = 'none';
    }, 255);
    
  } else {
    backLeftGui.style.display = 'block';
    setTimeout(() => {
      backLeftGui.style.borderWidth = '5px';
      backLeftGui.style.width = '5%';
    }, 52);
  }
}

export function disableGui() {
  guiRight.style.width = 0;
  guiRight.style.border = '0px';
}

export function enableGui() {
  guiRight.style.width = '35%';
  guiRight.style.border = 'solid var(--gui-border-size) var(--gui-border-color)';

  if (gameVars.canCall && !gameVars.hasCall) {
    callButton.innerText = 'Llamar';
  } else if (!gameVars.canCall) {
    callButton.innerText = '';
  } else if (gameVars.canCall && gameVars.hasCall) {
    callButton.innerText = 'Despedir';
  }
}

export function changeGuiText(newText = "") {
  guiText.style.opacity = 0;
  setTimeout(() => {
    guiText.innerText = newText;
    guiText.style.opacity = 1;
  }, 255);
}

export function transformChar(transformPlayer=true, grow=true) {
  let char;
  if (transformPlayer) {
    char = document.getElementById('player')
  } else {
    char = document.getElementById('enemy')
  }

  if (grow) {
    char.style.transform = 'scale(1.15)';
  } else {
    char.style.transform = 'scale(0.85)';
  }

  setTimeout(() => {
    char.style.transform = 'scale(1)';
  }, 100)

}

export function readyThrowGui(throwMessage = '¡Click para lanzar dado!') {
  writingText = "";
  if (magicRightGui.style.display = "grid") {
    toggleMagicGui(false, false);
  }
  disableGui();

  guiText.style.opacity = 0;

  setTimeout(() => {
    guiText.style.textAlign = 'center';
    guiText.innerText = throwMessage;
    guiText.style.opacity = 1;
  }, 260);

}

export function showGameCaption() {
  gameCaption.style.opacity = 1;
  setTimeout(() => {gameCaption.style.opacity = 0;}, 1000)
}


export function toggleMagicGui (show=true, basicGuiNext=true) {
  let manaCostDisplay = document.getElementById('mana-cost-display');
  let manaCostText = document.getElementById('mana-cost');
  writingText = "";
  if (show) {
    disableGui();
    toggleLeftGui(true);

    setTimeout(() => {
      magicRightGui.style.display = 'grid';
      setTimeout(() => {
        toggleBackButton(false);
        manaCostDisplay.style.opacity = 1;
        manaCostDisplay.style.transform = 'translateY(0)';
        magicRightGui.style.borderWidth = '5px';  
        magicRightGui.style.width = '35%';
        setTimeout(() => {
          guiText.innerText = "Elige tu magia"
        }, 255);
      }, 100);
    }, 255);

  } else {
    manaCostDisplay.style.opacity = 0;
    manaCostDisplay.style.transform = 'translateY(20%)';
    magicRightGui.style.borderWidth = '0px';
    magicRightGui.style.width = '0%';
    toggleBackButton(true);
    setTimeout(() => {
      manaCostText.innerText = "0";
      magicRightGui.style.display = "none";
    }, 250);

    if (basicGuiNext) {
      setTimeout(() => {
        toggleLeftGui(false);
        enableGui();
        guiLeft.style.borderColor = borderColor;
        setTimeout(() => {
          magicRightGui.style.display = 'none';
          writeRandomDialogue();
        }, 255);
      }, 355);
    }
  }
}

let floatingCaptionVisible = false;
export function showFloatingCaption() {
  if (!floatingCaptionVisible) {
    floatingCaptionVisible = true;
    let floatingCaption = document.getElementById('game-caption');

    floatingCaption.style.display = "block";
    floatingCaption.style.opacity = 1;
    setTimeout(() => {
      floatingCaption.style.opacity = 0;
      setTimeout(() => {
        floatingCaption.style.display = "none";
        floatingCaption.style.opacity = 1;
        floatingCaptionVisible = false;
      }, 505);
    }, 1000);
  }
}

export function deleteGui (fading=true) {
  // should be called only once, when (player/enemy HP <= 0)
  gui.style.opacity = 0;
  setTimeout(() => {
    gui.remove();
    clearDices();
  }, 255);
}