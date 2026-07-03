import { gameVars } from '../play.js';
import { stats, updateStatLabels } from './stats.js';
import { effectSuccesfulSFX } from './sfx.js';
import { call } from './call.js';

export function checkWhoCallEffects(playerDiceValue=1) {
    if (playerDiceValue === 2) {
        if (!stats.playerDmgUp) {
            stats.playerDmg += 5;
            stats.playerDmgUp = true;
            updateStatLabels();
        }
    }
}

export function outCallEffects(outCallNumber=1) {
    if (outCallNumber === 2) {
        if (stats.playerDmgUp) {
            stats.playerDmg -= 5;
            stats.playerDmgUp = false;
            updateStatLabels();
        }
    }
}

export function throwDiceEffectChance() {
    let callNumber = gameVars.callNum;
    let chance;
    let succesfullEffect = false;

    if (callNumber === 3) {
        chance = Math.floor((Math.random() * 4) + 1);
        if (chance !== 4) {
            effectSuccesfulSFX();
            succesfullEffect = true;
            gameVars.keeperEffect = chance;
        }
    } else if (callNumber === 5) {
        chance = Math.floor((Math.random() * 2) + 1);
        if (!gameVars.nextDicePlusOneValue && chance === 1) {
            effectSuccesfulSFX();
            succesfullEffect = true;
            gameVars.nextDicePlusOneValue = true;
        }
    } else if (callNumber === 6) {
        chance = Math.floor((Math.random() * 2) + 1);
        if (chance === 2) {
            effectSuccesfulSFX();
            succesfullEffect = true;
            gameVars.cainHelp = true;
        }
    } else if (callNumber === 7) {
        chance = Math.floor((Math.random() * 2) + 1);
        if (chance === 1) {
            effectSuccesfulSFX();
            succesfullEffect = true;
            gameVars.nextDicePlusOneValue = true;
            gameVars.cainHelp = true;
        }
    }

    if (succesfullEffect) {
        call.classList.add("glow");
        setTimeout(() => {
            call.classList.remove("glow");
        }, 800);
    }
}

export function checkValuesCallEffects(playerDiceValue=1, playerWin=true) {
    let callNumber = gameVars.callNum;

    if (callNumber === 4) {
        stats.playerMana += playerWin ? (playerDiceValue) : (playerDiceValue * 2);
        return;
    } else if (callNumber === 7) {
        stats.playerMana += playerDiceValue;
        return;
    }
}

export function callDamageAplifier(playerWin=false, damage) {
    let callNumber = gameVars.callNum;
    let dmg = damage;

    if (playerWin) {
        if (gameVars.cainHelp) {   // Cain help :p
            let additionalDmg = Math.floor((Math.random() * 16) + 1);
            gameVars.cainHelpValue = additionalDmg;
            dmg += additionalDmg;
            return dmg;
        }

    } else {
        if (callNumber === 1) {return dmg *= 3;}      // The lost
        else if (callNumber === 2) {return dmg *= 2;} // Judas
        else if (gameVars.cainHelp) {                 // Cain & 7
            let halfDmg = Math.floor(damage/2);
            let mitigatedDmg = Math.floor((Math.random() * halfDmg) + 1);
            gameVars.cainHelpValue = mitigatedDmg;
            dmg -= mitigatedDmg;
            return dmg;
        }
    }

    return dmg;
}

export function theLostEffect() {
    if ((gameVars.callNum === 1) && (!gameVars.nextDicePlusOneValue)) {
        gameVars.nextDicePlusOneValue = true;
    }
}

export function keeperEffect(playerDice, playerDiceValue=1) {
    if (gameVars.callNum !== 3) return;
    if (![1,2,3].includes(gameVars.keeperEffect)) return;

    if (gameVars.keeperEffect === 1) {
        let originalValue = playerDiceValue;
        let oneOrSix = Math.floor((Math.random() * 2) + 1);
        if (oneOrSix === 1) playerDiceValue = 1;
        if (oneOrSix === 2) playerDiceValue = 6;
        playerDice.setAttribute('data-value', playerDiceValue);
        if (playerDiceValue !== originalValue) {
            setTimeout(() => {
                playerDice.style.animation = "one-or-six 0.5s ease-in-out 1 none";
                setTimeout(() => {
                    playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d${playerDiceValue}.png`;
                }, 300);
            }, 200);
        }

    } else if (gameVars.keeperEffect === 2) {
        playerDice.setAttribute('data-value', 'CAT');
        playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d-cat.png`;

    } else if (gameVars.keeperEffect === 3) {
        playerDice.setAttribute('data-value', 'SP-EFFECT');
        playerDice.src = staticUrl + `bumbweb_game/sprites/dices/d-null.png`;
        let statToModify = Math.floor((Math.random() * 4) + 1);
        let reduce = Math.floor((Math.random() * 2) + 1);
        (reduce === 1) ? (reduce = true) : (reduce = false);
        switch (statToModify) {
            case 1:
                if (reduce) {
                    stats.playerHp = Math.round(stats.playerHp / 2);
                    gameVars.keeperDiceText = "HP\n50%";
                }
                else {
                    stats.playerHp = Math.round(stats.playerHp * 1.5);
                    gameVars.keeperDiceText = "HP\n150%";
                }
                break;
            case 2:
                if (reduce) {
                    stats.playerMana = Math.round(stats.playerMana / 2);
                    gameVars.keeperDiceText = "MANA\n50%";
                }
                else {
                    stats.playerMana = Math.round(stats.playerMana * 2);
                    gameVars.keeperDiceText = "MANA\n200%";
                }
                break;
            case 3:
                if (reduce) {
                    stats.playerDmg = Math.round(stats.playerDmg / 2);
                    gameVars.keeperDiceText = "DMG\n50%";
                }
                else {
                    stats.playerDmg = Math.round(stats.playerDmg * 1.5);
                    gameVars.keeperDiceText = "DMG\n150%";
                }
                break;
            case 4:
                if (reduce) {
                    stats.enemyHp = Math.round(stats.enemyHp * 0.75);
                    gameVars.keeperDiceText = "HP→\n75%";
                }
                else {
                    stats.enemyHp = Math.round(stats.enemyHp * 1.5);
                    gameVars.keeperDiceText = "HP→\n150%";
                }
                break;
            case 5:
                if (reduce) {
                    stats.enemyDmg = Math.round(stats.enemyDmg / 1.25);
                    gameVars.keeperDiceText = "DMG→\n80%";
                }
                else {
                    stats.enemyDmg = Math.round(stats.enemyDmg * 1.75);
                    gameVars.keeperDiceText = "DMG→\n175%";
                }
                break;
        }

        reduce ? 
            playerDice.setAttribute('data-effect', 'REDUCE') :
            playerDice.setAttribute('data-effect', 'EXPAND');

        const p = document.createElement('p');
        p.textContent = gameVars.keeperDiceText;
        p.style.position = 'absolute';
        p.style.bottom = playerDice.style.bottom;
        p.style.right = '0'; p.style.textAlign = 'center';
        p.style.width = `${playerDice.offsetWidth}px`;
        p.style.height = `${playerDice.offsetHeight}px`;
        p.style.margin = '0'; p.style.padding = '0.25rem';
        p.style.display = 'flex'; p.style.alignItems = 'center';
        p.style.justifyContent = 'center'; p.style.zIndex = 100;
        p.style.color = 'rgb(225,225,225)'; p.style.lineHeight = 1;
        p.style.whiteSpace = 'pre-wrap'; p.style.opacity = 0;
        p.style.transition = 'opacity 0.25s ease-in-out';

        let diceTextFontSize = Math.min(playerDice.offsetWidth, playerDice.offsetHeight) * 0.35;
        p.style.fontSize = diceTextFontSize + "px";

        playerDice.parentElement.appendChild(p);
        setTimeout(() => {p.style.opacity = 1}, 1);

        updateStatLabels();
    }
    return playerDiceValue;
}