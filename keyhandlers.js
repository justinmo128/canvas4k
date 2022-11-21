// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (controlSel) {
        controlsHandler(keyPressed);
    } else if (gameState === "start") {
        mainMenuHandler(keyPressed);
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
        }
    }
})

function mainMenuHandler(keyPressed) {
    if (keyPressed === "ArrowDown") {
        mainMenuSelect++;
        if (gameState === "start" && mainMenuSelect === 3 ||
        gameState === "controls" && mainMenuSelect === 5) {
            mainMenuSelect = 0;
        }
    } else if (keyPressed === "ArrowUp") {
        mainMenuSelect--;
        if (mainMenuSelect === -1) {
            if (gameState === "start") {
                mainMenuSelect = 2;
            } else if (gameState === "controls") {
                mainMenuSelect = 4;
            }
        }
    } else if (keyPressed === "Enter") {
        if (gameState === "start") {
            if (mainMenuSelect === 0) {
                loadSongs();
            } else if (mainMenuSelect === 1) {
                gameState = "controls";
                mainMenuSelect = 4;
            } else if (mainMenuSelect === 2) {
                downscroll = !downscroll;
            }
        } else if (gameState === "controls") {
            if (mainMenuSelect === 4) {
                gameState = "start";
                mainMenuSelect = 1;
                controlsNotEqual();
            } else {
                controlSel = true;
            }
        }
    } else if (keyPressed === "Escape") {
        if (gameState === "controls" && !controlSel) {
            gameState = "start";
            mainMenuSelect = 1;
            controlsNotEqual();
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
            gameState = "start";
            mainMenuSelect = 1;
            controlsNotEqual();
        } else {
            controlSel = true;
        }
    } else if (keyPressed === "Escape") {
        if (!controlSel) {
            gameState = "start";
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
        gameState = "start";
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
        }
    }
}