import { playEndBGM, playLoseDanceBGM, stopAllBGM } from "./play/sfx.js";
import { enemy } from "./play/characters.js";


const playToCertificate = document.getElementById("play-to-certificate");
const endGen = document.getElementById("end-gen");

export const game = document.getElementById("play");
export const gameElements = document.getElementById("game-elements");
export const gameVars = {
  canAction: false,
  hasCall: false,
  canCall: true,
  callNum: NaN,
  nextDicePlusOneValue: false,
  cainHelp: false,
  cainHelpValue: 0,
  keeperEffect: 0,
  keeperDiceText: "",
};

export function playEnd() {
  playToCertificate.style.display = "block";
  setTimeout(() => {
    playToCertificate.style.opacity = 1;
  }, 1);

  setTimeout(() => {
    play.style.display = "none";
    endGen.style.display = "block";
  }, 300);

  setTimeout(() => {
    playToCertificate.style.opacity = 0;
    setTimeout(() => {
      playToCertificate.style.display = "none";
      playEndBGM();
    }, 251);
  }, 750);
}

export function playLose() {
  let dCert = document.getElementById("d-cert");

  dCert.style.top = "0%";
  dCert.style.left = "20%";

  dCert.style.transition =
    "transform 0.75s ease-out, top 0.5s ease-out, left 0.5s ease-out";

  setTimeout(() => {
    dCert.style.transform = "rotateZ(140deg)";
    dCert.style.top = "14%";
    setTimeout(() => {
      dCert.style.left = "15%";
      showLoseCaptions();
    }, 250);
  }, 1);

  setTimeout(() => {
    dCert.style.transition =
      "transform 1s ease-out, top 1s ease-out, left 1s ease-in-out";
    dCert.style.transform = "rotateZ(70deg)";
    dCert.style.top = "24%";
    dCert.style.left = "23%";
    enemyDance();
    stopAllBGM();
    playLoseDanceBGM();
  }, 1000);

  setTimeout(() => {
    dCert.style.transition =
      "transform 0.75s ease-out, top 0.75s ease-out, left 0.75s ease-out";
    dCert.style.transform = "rotateZ(120deg)";
    dCert.style.top = "40%";
    dCert.style.left = "15%";
  }, 2000);

  setTimeout(() => {
    dCert.style.transition =
      "transform 1.25s ease-out, top 1s ease-out, left 1s ease-out";
    dCert.style.transform = "rotateZ(80deg)";
    dCert.style.top = "50%";
    dCert.style.left = "24%";
  }, 2800);
}

function showLoseCaptions() {
  let loseCaptions = document.getElementById("lose-captions");
  loseCaptions.style.display = "flex";
  void loseCaptions.offsetTop;
  loseCaptions.style.opacity = 1;
  document.getElementById("lose-accept").addEventListener(
    "click",
    () => {
      location.reload();
    },
    { once: true }
  );
  document.getElementById("lose-reject").addEventListener(
    "click",
    () => {
      const p = document.createElement("p");
      p.id = "lose-additional-msg";
      p.textContent = "¿Qué querés que haga entonces?\nRecarga la página o algo, yo qué sé";
      p.style.fontSize = "1.5rem";
      p.style.position = "absolute";
      p.style.textAlign = "center";
      p.style.width = "100%";
      p.style.bottom = "25%";
      p.style.transition = "opacity 0.5s ease-in-out";
      p.style.opacity = "0";
      
      loseCaptions.appendChild(p);
      void p.offsetHeight;
      p.style.opacity = "1";
    },
    { once: true }
  );
}

function enemyDance() {
  enemy.style.animation = "dancey-bruh 1s ease-in-out infinite";
}