import { generateWinImg } from './endgen.js';

let nameToCertificate = document.getElementById('name-to-certificate');
let endCertificate = document.getElementById('end-certificate');
let screenKeyboard = document.getElementById("enter-name-screenkeyboard");
let toggleSystemKeyboardButton = document.getElementById('toggle-keyboardwrite');
let nameInput = document.getElementById('input-player-name');
let doneButton = document.getElementById('done-button');
let done = false;

'1234567890QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('').forEach(c => {
    let currentButton = document.createElement('button');
    currentButton.className = 'tecla';
    currentButton.textContent = c;
    currentButton.onclick = () => writeChar(c);
    screenKeyboard.appendChild(currentButton);
});

let emptySpace = document.createElement('p');
    emptySpace.className = '';
    emptySpace.textContent = '';
    emptySpace.onclick = () => writeChar('');
    screenKeyboard.appendChild(emptySpace);

let backspaceButton = document.createElement('button');
    backspaceButton.className = 'tecla';
    backspaceButton.textContent = '←';
    backspaceButton.onclick = () => writeChar('backspace');
    screenKeyboard.appendChild(backspaceButton);

let spaceButton = document.createElement('button');
    spaceButton.className = 'tecla';
    spaceButton.textContent = '—';
    spaceButton.onclick = () => writeChar('space');
    screenKeyboard.appendChild(spaceButton);

function writeChar(c) {
    if (done) {return;}
    if (nameInput.value.length >= 15 && c !== 'backspace') {return;}
    if (c === 'backspace') {
        nameInput.value = nameInput.value.slice(0, -1);
        toggleDoneButton();
        return; }
    if (c === 'space') {
        nameInput.value += ' ';
        return;}
    nameInput.value += c;
    toggleDoneButton();
}

function toggleDoneButton() {
    if (nameInput.value.length >= 1) {
        doneButton.style.display = 'block';
    } else if (nameInput.value.length < 1) {
        doneButton.style.display = 'none';
    }
}

toggleSystemKeyboardButton.addEventListener('click', () => {
    if (done) {return;}
    nameInput.readOnly = !nameInput.readOnly;
    nameInput.classList.toggle('is-focused');
});

nameInput.addEventListener('input', toggleDoneButton);


export let finalPlayerName = "";
doneButton.addEventListener('click', () => {
    done = true;
    finalPlayerName = nameInput.value;
    nameInput.readOnly = true;

    nameToCertificate.style.display = "block";
    setTimeout(() => {
        nameToCertificate.style.opacity = 1;
    }, 1);
        
    setTimeout(async () => {
        document.getElementById('enter-name').style.display = "none";
        endCertificate.style.display = "block";
        await generateWinImg(finalPlayerName);
        nameToCertificate.style.opacity = 0;
        setTimeout(() => {
            nameToCertificate.style.display = "none";
        }, 255);
    }, 300);
});
