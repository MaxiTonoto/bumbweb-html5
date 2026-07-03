import { playBumguideSFX } from "./play/sfx.js";
import { startGame } from './play/gui.js';
import { stats } from './play/stats.js';

const staticUrl = "./";
let canPassDialogue, bumGuide, dialogueBox;
bumGuide = document.getElementById("bumguide");
dialogueBox = document.getElementById("intro-dialogue");

export function startIntro () {
  document.getElementById('skip-intro-button').addEventListener('click', skipIntro);
  let dialogueIndex = 0;
  let dialogues = [
    "* Hola",
    "* Soy Bumguide",
    "* Eres Bumbo",
    "* Y estás por pelear contra Bumbino",
    "* A lanzar dados",
    "* ¡Buena suerte!",
  ];
  canPassDialogue = true;

  document.getElementById("intro-screen-button").addEventListener("click", () => {
      let dialoguesLeft = dialogueIndex <= dialogues.length - 1;

      if (canPassDialogue && dialoguesLeft) {
        introDialogueWrite(dialogues[dialogueIndex], dialogueBox);
        dialogueIndex++;
      } else if (!dialoguesLeft) {
        passIntroScene();
      }
    });
}

function introDialogueWrite(text, textBox, i = 0) {
  let currentChar = text[i];
  canPassDialogue = false;

  if (i === 0) {   // empty start
    textBox.innerText = "";
  }

  textBox.textContent += currentChar; // write next char

  // switch bumguide face
  if (bumGuide.src.includes("bumguide-1.png") && currentChar !== " ") {
    bumGuide.src = staticUrl + "bumbweb_game/sprites/characters/bumguide-2.png";
  } else {
    bumGuide.src = staticUrl + "bumbweb_game/sprites/characters/bumguide-1.png";
  }

  // play voice for non-space chars
  currentChar !== " " && playBumguideSFX();

  if (i < text.length - 1) {
    // write next char if not end of text
    setTimeout(() => {
      i++;
      introDialogueWrite(text, textBox, i);
    }, 45);
  } else {
    // enable passing to next dialogue
    canPassDialogue = true;

    // end talk with normal face
    if (bumGuide.src.endsWith("bumguide-2.png")) {
      bumGuide.src =
        staticUrl + "bumbweb_game/sprites/characters/bumguide-happy.png";
    }
  }
}

function passIntroScene() {
  let introScreen = document.getElementById('intro');
  let passingScreen = document.getElementById('intro-to-play');

  passingScreen.style.display = "block";

  setTimeout(() => {
    passingScreen.style.opacity = 1;
  }, 0);

  setTimeout(() => {
    introScreen.style.display = 'none';
    setTimeout(startGame, 1);
  }, 250);
}

function skipIntro() {
  document.getElementById("intro-screen-button").style.display = 'none';
  canPassDialogue = false;
  passIntroScene();
}