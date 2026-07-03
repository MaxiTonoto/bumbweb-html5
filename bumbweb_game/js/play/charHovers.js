import { gameVars } from "../play.js";
import { callName } from "./call.js";
import { stats } from "./stats.js";

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const call = document.getElementById("call");
const staticUrl = "./";
const tooltip = document.getElementById("show-onhover-tooltip");
const tooltipImage = document.getElementById("tooltip-image");
const tooltipTitle = document.getElementById("tooltip-text-title");
const tooltipDescription = document.getElementById("tooltip-text-description");

player.addEventListener("mouseenter", () => {
  tooltip.style.display = "flex";
  tooltipImage.src = staticUrl + "bumbweb_game/sprites/characters/player.png";
  tooltipTitle.innerText = "Bumbo";
  tooltipDescription.innerText = "Tú, Bumbo. Muy bueno👍";
});

player.addEventListener("mouseleave", () => {
  tooltip.style.display = "none";
});

enemy.addEventListener("mouseenter", () => {
  tooltip.style.display = "flex";
  tooltipImage.src = staticUrl + "bumbweb_game/sprites/characters/enemy.png";
  tooltipTitle.innerText = `Bumbino (${stats.enemyDmg} dmg)`;
  tooltipDescription.innerText = "Te quiere pegar, pero tiene que sacar un número más alto en el dado primero.";
});
  
enemy.addEventListener("mouseleave", () => {
  tooltip.style.display = "none";
});

call.addEventListener("mouseenter", () => {
  if (!gameVars.hasCall) return;
  
  tooltip.style.display = "flex";
  tooltipImage.src = staticUrl + `bumbweb_game/sprites/calls/call-${gameVars.callNum}.png`;
  tooltipTitle.innerText = callName[gameVars.callNum-1];
  switch (gameVars.callNum) {
    case 1:
        tooltipDescription.innerText = "Recibes x3 daño pero tus dados tienen +1 valor permanentemente.";
        break;
    case 2:
        tooltipDescription.innerText = "Recibes x2 daño pero tu daño aumenta +5 mientras tengas a Judas.";
        break;
    case 3:
        tooltipDescription.innerText = "Posibilidad de convertir el dado en 1, 6, un gato (empate), o un cambio de stats (en Bumbo o Bumbino)";
        break;
    case 4:
        tooltipDescription.innerText = "Obtienes maná igual al número de tu dado. x2 maná si te hicieron daño.";
        break;
    case 5:
        tooltipDescription.innerText = "50% chance de tener +1 valor de dado (aplica para magias)";
        break;
    case 6:
        tooltipDescription.innerText = "50% chance de aumentar o bloquear daño en la tirada de dados.";
        break;
    case 7:
        tooltipDescription.innerText = "Regeneras maná igual al valor de tu dado, 50% chance de +1 valor en siguiente dado y aumentar daño infligido/reducir daño bloqueado";
        break;
  
    default:
        tooltipTitle.innerText = "¿Pero qué pasó? 💀";
        tooltipDescription.innerText = "Este es un bug :(";
        break;
  }
});
    
call.addEventListener("mouseleave", () => {
  tooltip.style.display = "none";
});