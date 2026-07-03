import { startIntro } from "./intro.js";

const staticUrl = "./";
const loadingProgress = document.getElementById('loading-progress');
const imageUrls = [
    "./bumbweb_game/sprites/characters/bumguide-1.png",
    "./bumbweb_game/sprites/characters/bumguide-2.png",
    "./bumbweb_game/sprites/characters/bumguide-happy.png",
    "./bumbweb_game/sprites/characters/enemy.png",
    "./bumbweb_game/sprites/characters/enemy-hurt.png",
    "./bumbweb_game/sprites/characters/enemy-ready.png",
    "./bumbweb_game/sprites/characters/enemy-throw-pre.png",
    "./bumbweb_game/sprites/characters/enemy-throw.png",
    "./bumbweb_game/sprites/characters/player.png",
    "./bumbweb_game/sprites/characters/player-hurt.png",
    "./bumbweb_game/sprites/characters/player-ready.png",
    "./bumbweb_game/sprites/characters/player-throw.png",
    "./bumbweb_game/sprites/dices/d1.png",
    "./bumbweb_game/sprites/dices/d2.png",
    "./bumbweb_game/sprites/dices/d3.png",
    "./bumbweb_game/sprites/dices/d4.png",
    "./bumbweb_game/sprites/dices/d5.png",
    "./bumbweb_game/sprites/dices/d6.png",
    "./bumbweb_game/sprites/dices/d7.png",
    "./bumbweb_game/sprites/dices/d-cat.png",
    "./bumbweb_game/sprites/dices/d-null.png",
    "./bumbweb_game/sprites/dices/d-roll.gif",
    "./bumbweb_game/sprites/calls/call-1.png",
    "./bumbweb_game/sprites/calls/call-1-hurt.png",
    "./bumbweb_game/sprites/calls/call-1-side.png",
    "./bumbweb_game/sprites/calls/call-2.png",
    "./bumbweb_game/sprites/calls/call-2-hurt.png",
    "./bumbweb_game/sprites/calls/call-2-side.png",
    "./bumbweb_game/sprites/calls/call-3.png",
    "./bumbweb_game/sprites/calls/call-3-hurt.png",
    "./bumbweb_game/sprites/calls/call-3-side.png",
    "./bumbweb_game/sprites/calls/call-4.png",
    "./bumbweb_game/sprites/calls/call-4-hurt.png",
    "./bumbweb_game/sprites/calls/call-4-side.png",
    "./bumbweb_game/sprites/calls/call-5.png",
    "./bumbweb_game/sprites/calls/call-5-hurt.png",
    "./bumbweb_game/sprites/calls/call-5-side.png",
    "./bumbweb_game/sprites/calls/call-6.png",
    "./bumbweb_game/sprites/calls/call-6-hurt.png",
    "./bumbweb_game/sprites/calls/call-6-side.png",
    "./bumbweb_game/sprites/calls/call-7.png",
    "./bumbweb_game/sprites/calls/call-7-hurt.png",
    "./bumbweb_game/sprites/calls/call-7-side.png",
    "./bumbweb_game/sprites/d-cert.png",
    "./bumbweb_game/sprites/platform.png",
    "./bumbweb_game/extras/win-template3.jpeg",
    "./bumbweb_game/extras/bumbo-stick.png",
];


window.addEventListener("load", () => {
    preloadImages(imageUrls, () => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("game").style.display = "block";
        startIntro();
    });
});

let eachProgress = 100 / imageUrls.length;
function preloadImages(urls, callback) {
    let loaded = 0;

    urls.forEach(url => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loaded++;
            loadingProgress.value += eachProgress;
            if (loaded === urls.length) callback();
        };
        img.src = url;
    });
}