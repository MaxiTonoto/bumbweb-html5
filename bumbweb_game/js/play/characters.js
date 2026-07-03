import { callName } from "./call.js";
import { gameVars } from "../play.js";

const staticUrl = window.location.pathname.includes('/bumbweb-html5')
  ? window.location.origin + '/bumbweb-html5/'
  : './';
export const player = document.getElementById("player");
export const enemy = document.getElementById("enemy");
export const call = document.getElementById("call");

export function growBack(growPlayer = true, hasCall = false) {
  if (growPlayer && !hasCall) {
    player.style.transform = "scale(1.12)";
    setTimeout(() => {
      player.style.transform = "scale(1)";
    }, 105);
  } else if (growPlayer && hasCall) {
    call.style.transform = "scale(1.15)";
    setTimeout(() => {
      call.style.transform = "scale(1)";
    }, 105);
  } else {
    enemy.style.transform = "scale(1.12)";
    setTimeout(() => {
      enemy.style.transform = "scale(1)";
    }, 105);
  }
}

export function shrinkBack(shrinkPlayer = true, hasCall = false) {
  if (shrinkPlayer && !hasCall) {
    player.style.transform = "scale(0.9)";
    setTimeout(() => {
      player.style.transform = "scale(1)";
    }, 105);
  } else if (shrinkPlayer && hasCall) {
    call.style.transform = "scale(0.9)";
    setTimeout(() => {
      call.style.transform = "scale(1)";
    }, 105);
  } else {
    enemy.style.transform = "scale(0.9)";
    setTimeout(() => {
      enemy.style.transform = "scale(1)";
    }, 105);
  }
}

export function playerMove() {
  let setInitialTransition = () => {
    player.style.transition = "all 0.1s ease-in-out";
  };
  let setFastTransition = () => {
    player.style.transition = "all 250ms ease-in-out";
  };

  setFastTransition();
  player.style.bottom = "62%";
  player.style.transform = "scaleX(-1)";

  setTimeout(() => {
    player.style.left = "5%";
    setTimeout(() => {
      player.style.transform = "scaleX(1)";
      setTimeout(setInitialTransition, 250);
    }, 350);
  }, 500);
}

export function playerMoveBack() {
  let setInitialTransition = () => {
    player.style.transition = "all 0.1s ease-in-out";
  };
  let setFastTransition = () => {
    player.style.transition = "all 250ms ease-in-out";
  };

  setFastTransition();
  player.style.left = "15%";
  setTimeout(() => {
    player.style.bottom = "42%";
    setTimeout(setInitialTransition, 350);
  }, 350);
}

export function setPlayerExpression(expression="") {
  if (!expression) return;

  switch (expression) {
    case "normal":
      player.src = staticUrl + 'bumbweb_game/sprites/characters/player.png';
      break;
    case "hurt":
      player.src = staticUrl + 'bumbweb_game/sprites/characters/player-hurt.png';
      break;
    case "ready":
      player.src = staticUrl + 'bumbweb_game/sprites/characters/player-ready.png';
      break;
    case "throw":
      player.src = staticUrl + 'bumbweb_game/sprites/characters/player-throw.png';
      break;
    default:
      player.src = staticUrl + 'bumbweb_game/sprites/characters/player.png';
  }
}

export function setEnemyExpression(expression="") {
  if (!expression) return;

  switch (expression) {
    case "normal":
      enemy.src = staticUrl + 'bumbweb_game/sprites/characters/enemy.png';
      break;
    case "hurt":
      enemy.src = staticUrl + 'bumbweb_game/sprites/characters/enemy-hurt.png';
      break;
    case "ready":
      enemy.src = staticUrl + 'bumbweb_game/sprites/characters/enemy-ready.png';
      break;
    case "throw":
      enemy.src = staticUrl + 'bumbweb_game/sprites/characters/enemy-throw-pre.png';
      setTimeout(() => {
        enemy.src = staticUrl + 'bumbweb_game/sprites/characters/enemy-throw.png';
      }, 100);
      break;
    default:
      enemy.src = staticUrl + 'bumbweb_game/sprites/characters/enemy.png';
  }
}

export function setCallExpression(expression="") {
  if (!expression) return;

  switch (expression) {
    case "normal":
      call.src = staticUrl + `bumbweb_game/sprites/calls/call-${gameVars.callNum}.png`;
      break;
    case "throw":
    case "side":
      call.src = staticUrl + `bumbweb_game/sprites/calls/call-${gameVars.callNum}-side.png`;
      break;
    case "ready":
    case "hurt":
      call.src = staticUrl + `bumbweb_game/sprites/calls/call-${gameVars.callNum}-hurt.png`;
      break;
    default:
      call.src = staticUrl + `bumbweb_game/sprites/calls/call-${gameVars.callNum}.png`;
  }
}