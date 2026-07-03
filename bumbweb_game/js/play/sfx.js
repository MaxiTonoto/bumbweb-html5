const volumeButton = document.getElementById('toggle-volume');
const volumeSlider = document.getElementById('sfx-volume-slider');
const musicButton = document.getElementById('toggle-music');
const musicSlider = document.getElementById('music-volume-slider');


volumeButton.addEventListener('click', () => {
    if (volumeSlider.value > 0) {
        volumeButton.innerText = '🔈';
        volumeSlider.value = 0;
    } else {
        volumeButton.innerText = '🔊';
        volumeSlider.value = 0.5;
    }
    sessionStorage.setItem("sfxVolumeValue", volumeSlider.value);
});
volumeSlider.addEventListener('input', () => {
    volumeButton.innerText = (volumeSlider.value > 0) ? '🔊' : '🔈';
    sessionStorage.setItem("sfxVolumeValue", volumeSlider.value);
});

musicButton.addEventListener('click', () => {
    if (musicSlider.value > 0) {
        musicButton.innerText = '🤐';
        musicSlider.value = 0;
    } else {
        musicButton.innerText = '🎵';
        musicSlider.value = 0.25;
    }
    document.querySelectorAll('.game-music').forEach(song => {
        song.volume = musicSlider.value;});
    sessionStorage.setItem("musicVolumeValue", musicSlider.value);
});
musicSlider.addEventListener('input', () => {
    musicButton.innerText = (musicSlider.value > 0) ? '🎵' : '🤐';
    document.querySelectorAll('.game-music').forEach(song => {
        song.volume = musicSlider.value;});
    sessionStorage.setItem("musicVolumeValue", musicSlider.value);
});

document.getElementById('mute-all').addEventListener('click', () => {
    volumeButton.click();
    musicButton.click();
});

window.addEventListener('load', () => {
    let savedSFXVolume = Number(sessionStorage.getItem('sfxVolumeValue')) || 0.5;
    let savedMusicVolume = Number(sessionStorage.getItem('musicVolumeValue')) || 0.25;
    volumeSlider.value = savedSFXVolume;
    musicSlider.value = savedMusicVolume;
    volumeButton.innerText = (volumeSlider.value > 0) ? '🔊' : '🔈';
    musicButton.innerText = (musicSlider.value > 0) ? '🎵' : '🤐';
}, { once:true });

// SFX

export function playBumguideSFX() {
    if (volumeSlider.value <= 0) return;

    const bumguideSFX = document.getElementById("bumguide-sound");
    bumguideSFX.volume = parseFloat(volumeSlider.value / 2);    
    bumguideSFX.play();
}

export function playTextAudio() {
    if (volumeSlider.value <= 0) return;

    const textAudio = document.getElementById('play-text-audio');
    textAudio.volume = parseFloat(volumeSlider.value / 1.25);
    textAudio.play();
}

export function effectSuccesfulSFX() {
    if (volumeSlider.value <= 0) return;

    let sfx = document.getElementById('effect-aah');
    sfx.volume = parseFloat(volumeSlider.value / 2); 
    sfx.play();
}

export function damageSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('damage-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 2);
    sfx.play();
}
export function callEnterSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('call-enter-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 2);
    sfx.play();
}
export function callOutSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('call-out-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 2);
    sfx.play();
}

export function playEurghSFX() {
    if (volumeSlider.value <= 0) return;

    const eurghSFX = document.getElementById("eurgh");
    eurghSFX.currentTime = 0;
    eurghSFX.volume = parseFloat(volumeSlider.value / 4); 
    eurghSFX.play();
}

export function playCallEurghSFX() {
    if (volumeSlider.value <= 0) return;

    const callEurghSFX = document.getElementById("eurgh-call");
    callEurghSFX.currentTime = 0;
    callEurghSFX.volume = parseFloat(volumeSlider.value / 4);
    callEurghSFX.play();
}

export function playDiceReadySFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('dice-ready-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 1.25);
    sfx.play();
}

export function playDiceThrowSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('dice-throw-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 2);
    sfx.play();
}

export function playDicePlusOneValueSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('dice-plusonevalue-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 2.5);
    sfx.play();
}

export function castBumboWinSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('cast-bumbo-win-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 2.5);
    sfx.play();
}

export function castValueppSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('cast-valuepp-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 3);
    sfx.play();
}

export function healSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('heal-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 1.5);
    sfx.play();
}

export function castBreadCheeseSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('cast-breadcheese-sfx');
    sfx.volume = parseFloat(volumeSlider.value);
    sfx.play();
}

export function openMagicMenuSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('open-magic-menu-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 4);
    sfx.play();
}

export function closeMagicMenuSFX() {
    if (volumeSlider.value <= 0) return;

    const sfx = document.getElementById('close-magic-menu-sfx');
    sfx.volume = parseFloat(volumeSlider.value / 4);
    sfx.play();
}


// MUSIC

export function playBattleBGM() {
    const song = document.getElementById('play-bgm');
    if (musicSlider.value > 0) song.volume = musicSlider.value;
    song.play();
}

export function playEndBGM() {
    const song = document.getElementById('end-bgm');
    if (musicSlider.value > 0) song.volume = musicSlider.value;
    song.play();
}

export function playLoseDanceBGM() {
    const song = document.getElementById('lose-dance-bgm');
    if (musicSlider.value > 0) song.volume = musicSlider.value;
    song.play();
}

export function fadeOutGameBGM() {
    if (musicSlider.value <= 0) return;

    const song = document.getElementById('play-bgm');
    if (!song.paused) {
        const decreaseBGM = setInterval(() => {
            if (song.volume > 0.01) {
                song.volume = Math.max(0, song.volume - 0.01);
            } else {
                song.volume = 0;
                song.pause();
                clearInterval(decreaseBGM)
            }
        }, 25);
    }
}

export function stopAllBGM() {
    document.querySelectorAll('.game-music').forEach(song => {
        song.pause();
    });
}