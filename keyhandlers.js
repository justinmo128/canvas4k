// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (controlSel) {
        controlsHandler(keyPressed);
    } else if (gameState === "start" || gameState === "controls") {
        mainMenuHandler(keyPressed);
    } else if (gameState === "songselect") {
        songSelectHandler(keyPressed);
    } else if (gameState ===  "gameLoop" && keyPressed === "Escape") {
        song.endSong();
    }
        
    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i]) {
            held[i] = true;
        }
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
        if (gameState === "controls") {
            if (!controlSel) {
                gameState = "start";
                mainMenuSelect = 1;
                controlsNotEqual();
            }
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
    }
}