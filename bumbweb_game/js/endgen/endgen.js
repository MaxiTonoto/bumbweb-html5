import { gameVars } from "../play.js";

const staticUrl = window.location.pathname.includes('/bumbweb-html5')
  ? window.location.origin + '/bumbweb-html5/'
  : './';
let callUrl = document.getElementById("call").src;
let dateToday = new Date();
dateToday = dateToday.toLocaleDateString("es-ES");

export async function generateWinImg(playerName = "Bumbo") {
  const certCanvas = document.createElement("canvas");
  certCanvas.id = "win-certificate";
  certCanvas.width = 500;
  certCanvas.height = 350;

  const ctx = certCanvas.getContext("2d");

  const img = new Image();
  img.src = staticUrl + "bumbweb_game/extras/win-template3.jpeg";
  img.onload = () => {
    ctx.drawImage(img, 0, 0, certCanvas.width, certCanvas.height);

    ctx.fillStyle = "rgba(40, 17, 5, 0.5)";
    ctx.fillRect(25, 30, 5, 290);
    ctx.fillRect(470, 30, 5, 290);
    ctx.fillRect(25, 320, 450, 5);
    ctx.fillRect(25, 25, 200, 5);
    ctx.fillRect(275, 25, 200, 5);
    ctx.fillStyle = "rgba(102, 17, 17, 0.15)";
    ctx.fillRect(225, 0, 50, 60);

    document.fonts.load("20px 'Determination Mono'").then(() => {
      ctx.font = "14px 'Determination Mono'";
      ctx.fillStyle = "rgb(38, 22, 6)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(dateToday, 376, 275);

      ctx.font = "32px 'Determination Mono'";
      ctx.fillText(playerName, certCanvas.width / 2, 200);
    });

    const callImg = new Image();
    gameVars.hasCall
      ? (callImg.src = staticUrl + `bumbweb_game/sprites/calls/call-${gameVars.callNum}.png`)
      : (callImg.src = staticUrl + "bumbweb_game/extras/bumbo-stick.png");
    callImg.onload = () => {
      ctx.drawImage(callImg, 225, 5, 50, 50);
    };
  };

  document.getElementById("end-certificate").appendChild(certCanvas);
  scaleCertificate();
  enableDownloadCertificate();
}

function scaleCertificate() {
    const cert = document.getElementById('win-certificate');
    if (!cert) return;
    let scale = Math.min((window.innerWidth / 2) / 500, (window.innerHeight / 2) / 350);

    cert.style.transform = `translateX(-50%) scale(${scale})`;
    cert.style.transformOrigin = 'top center';
}

window.addEventListener('resize', scaleCertificate);

function enableDownloadCertificate() {
    
    document.getElementById('download-certificate-button').addEventListener('click', () => {
        const image = document.getElementById("win-certificate").toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = image;
        link.download = `bumbweb_win-${dateToday.replace("/", "-")}.jpeg`;
        link.click();
    });

}