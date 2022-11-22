// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (controlSel) {
        controlsHandler(keyPressed);
    } else if (gameState === "topMenu") {
        topMenuHandler(keyPressed);
    } else if (gameState === "controls") {
        controlMenuHandler(keyPressed);
    } else if (gameState === "songselect") {
        songSelectHandler(keyPressed);
    } else if (gameState ===  "gameLoop") {
        gameHandler(keyPressed)
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;

    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i]) {
            held[i] = false;
            keyUsed[i] = false;
        }
    }
})

function topMenuHandler(keyPressed) {
    if (keyPressed === "ArrowDown") {
        mainMenuSelect++;
        if (mainMenuSelect === 3) {
            mainMenuSelect = 0;
        }
    } else if (keyPressed === "ArrowUp") {
        mainMenuSelect--;
        if (mainMenuSelect === -1) {
            mainMenuSelect = 2;
        }
    } else if (keyPressed === "Enter") {
        if (mainMenuSelect === 0) {
            loadSongs();
        } else if (mainMenuSelect === 1) {
            gameState = "controls";
            mainMenuSelect = 4;
        } else if (mainMenuSelect === 2) {
            downscroll = !downscroll;
        }
    }
}

function controlMenuHandler(keyPressed) {
    if (keyPressed === "ArrowDown") {
        mainMenuSelect++;
        if (mainMenuSelect === 5) {
            mainMenuSelect = 0;
        }
    } else if (keyPressed === "ArrowUp") {
        mainMenuSelect--;
        if (mainMenuSelect === -1) {
            mainMenuSelect = 4;
        }
    } else if (keyPressed === "Enter") {
        if (mainMenuSelect === 4) {
            gameState = "topMenu";
            mainMenuSelect = 1;
            controlsNotEqual();
        } else {
            controlSel = true;
        }
    } else if (keyPressed === "Escape") {
        if (!controlSel) {
            gameState = "topMenu";
            mainMenuSelect = 1;
            controlsNotEqual();
        }
    }
}

function controlsHandler(keyPressed) {
    if (keyPressed === "Escape") {
        setTimeout(() => {controlSel = false;}, 1);
    } else {
        controls[mainMenuSelect] = keyPressed;
        controlSel = false;
    }
}

function songSelectHandler(keyPressed) {
    if (keyPressed === "Enter") {
        startGame();
    } else if (keyPressed === "Escape") {
        song[mainMenuSelect].audio.pause();
        song[mainMenuSelect].audio.currentTime = 0;
        gameState = "topMenu";
        mainMenuSelect = 0;
    } else if (keyPressed === "ArrowDown") {
        song[mainMenuSelect].audio.pause();
        song[mainMenuSelect].audio.currentTime = 0;
        mainMenuSelect++;
        if (mainMenuSelect >= songList.length) {
            mainMenuSelect = 0;
        }
    } else if (keyPressed === "ArrowUp") {
        song[mainMenuSelect].audio.pause();
        song[mainMenuSelect].audio.currentTime = 0;
        mainMenuSelect--;
        if (mainMenuSelect < 0) {
            mainMenuSelect = (songList.length - 1);
        }
    }
}

function gameHandler(keyPressed) {
    if (keyPressed === "Escape") {
        currentSong.endSong();
    }

    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i]) {
            held[i] = true;
            judge(currentSong.songposition, i);
        }
    }
}

function judge(hitTime, key) {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].isHit === false && notes[i].dir === key && keyUsed[key] === false && hitTime <= notes[i].time + 180 && hitTime >= notes[i].time - 180) { // Has the note already been hit? Does the note match the key pressed? Is the hit time within the notes leniency?
            keyUsed[key] = true;
            notes[i].isHit = true;
            if (hitTime <= notes[i].time + 22 &&
                hitTime >= notes[i].time - 22) {
                    judgeCount.marvelous++;
            } else if (hitTime <= notes[i].time + 45 &&
                hitTime >= notes[i].time - 45) {
                    judgeCount.superb++;
            } else if (hitTime <= notes[i].time + 90 &&
                hitTime >= notes[i].time - 90) {
                    judgeCount.great++;
            } else if (hitTime <= notes[i].time + 135 &&
                hitTime >= notes[i].time - 135) {
                    judgeCount.uhh++;
            } else if (hitTime <= notes[i].time + 180 &&
                hitTime >= notes[i].time - 180) {
                    judgeCount.bruh++;
            }
            break;
        }
    }
}