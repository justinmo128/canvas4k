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

    if (gameState === "gameLoop") {
        gameReleaseHandler(keyPressed);
    }
})

function topMenuHandler(keyPressed) {
    if (keyPressed === "ArrowDown") {
        mainMenuSelect++;
        if (mainMenuSelect === 6) {
            mainMenuSelect = 0;
        }
    } else if (keyPressed === "ArrowUp") {
        mainMenuSelect--;
        if (mainMenuSelect === -1) {
            mainMenuSelect = 5;
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
    } else if (keyPressed === "ArrowRight") {
        if (mainMenuSelect === 2) {
            downscroll = !downscroll;
        } else if (mainMenuSelect === 3) {
            scrollSpeed++;
        } else if (mainMenuSelect === 4) {
            visualOffset++;
        } else if (mainMenuSelect === 5) {
            audioOffset++;
        }
    } else if (keyPressed === "ArrowLeft") {
        if (mainMenuSelect === 2) {
            downscroll = !downscroll;
        } else if (mainMenuSelect === 3) {
            scrollSpeed--;
        } else if (mainMenuSelect === 4) {
            visualOffset--;
        } else if (mainMenuSelect === 5) {
            audioOffset--;
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

    let noteIndex = 0;
    let holdIndex = 0;
    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i]) {
            held[i] = true;
            for (let j = noteIndex; j < notes.length; j++) {
                if (notes[j].judge(currentSong.songposition, i)) {
                    noteIndex++;
                    break;
                }
            }
            for (let j = holdIndex; j < holds.length; j++) {
                if (holds[j].judge(currentSong.songposition, i)) {
                    holdIndex++;
                    break;
                }
            }
        }
    }
}

function gameReleaseHandler(keyPressed) {
    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i]) {
            held[i] = false;
            keyUsed[i] = false;
            for (let j = 0; j < holds.length; j++) {
                setTimeout(() => {
                    if (held[i] === false && i === holds[j].dir) {
                        holds[j].isHolding = false;
                    }
                }, 200)
            }
        }
    }
}