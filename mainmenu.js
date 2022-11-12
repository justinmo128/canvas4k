function mainMenu() {
    drawMainComponents();
    drawStart();
    if (mainMenuSelect === 0) {
        ctx.drawImage(buttonhover, 10, 169)
    } else if (mainMenuSelect === 1) {
        ctx.drawImage(buttonhover, 10, 219)
    }
    ctx.font = "30px Roboto";
    ctx.fillText("Start", 35, 200);
    ctx.fillText("Controls", 35, 250);
}

function drawStart() {
    ctx.fillStyle = "#007F96";
    ctx.fillRect(cnv.width - cnv.width / 2, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Roboto";
    ctx.fillText("Canvas4K", 330, 60);
    ctx.font = "22px Roboto";
    ctx.fillText(`Your controls:`, 330, 90);
    ctx.fillText(`${controls[0]}, ${controls[1]}, ${controls[2]}, ${controls[3]}`, 330, 120);
    ctx.fillText("Use Arrow Keys and Enter to", 330, 440);
    ctx.fillText("navigate the menu.", 330, 470);
}

function controlsScreen() {
    drawMainComponents();
    drawStart();
    drawControlSelect();
    if (mainMenuSelect === 0) {
        ctx.fillStyle = "purple";
        ctx.fillRect(20, 40, 50, 50);
    } else if (mainMenuSelect === 1) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(20, 100, 50, 50);
    } else if (mainMenuSelect === 2) {
        ctx.fillStyle = "lime";
        ctx.fillRect(20, 160, 50, 50);
    } else if (mainMenuSelect === 3) {
        ctx.fillStyle = "red";
        ctx.fillRect(20, 220, 50, 50);
    } else if (mainMenuSelect === 4) {
        ctx.drawImage(buttonhover, 10, 369)
    }
    ctx.font = "30px Roboto";
    // Left
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 40, 50, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Left", 90, 75);
    // Down
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 100, 50, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Down", 90, 135);
    // Up
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 160, 50, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Up", 90, 195);
    // Right
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 220, 50, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Right", 90, 255);
    // Back
    ctx.fillStyle = "white";
    ctx.fillText("Back", 35, 400);
}

function mainMenuHandler(keyPressed) {
    if (keyPressed === "ArrowDown") {
        mainMenuSelect++;
        if (gameState === "start" && mainMenuSelect === 2 ||
        gameState === "controls" && mainMenuSelect === 5) {
            mainMenuSelect = 0;
        }
    } else if (keyPressed === "ArrowUp") {
        mainMenuSelect--;
        if (mainMenuSelect === -1) {
            if (gameState === "start") {
                mainMenuSelect = 1;
            } else if (gameState === "controls") {
                mainMenuSelect = 4;
            }
        }
    }
    if (keyPressed === "Enter") {
        if (gameState === "start") {
            if (mainMenuSelect === 0) {
                startGame();
            } else if (mainMenuSelect === 1) {
                gameState = "controls";
                mainMenuSelect = 4;
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
    }
}

function controlsHandler(keyPressed) {
    if (controlSel) {
        controls[mainMenuSelect] = keyPressed;
        controlSel = false;
    }
}

function drawControlSelect() {
    if (controlSel) {
        if (mainMenuSelect === 0) {
            ctx.drawImage(buttonhover, 10, 45);
        } else if (mainMenuSelect === 1) {
            ctx.drawImage(buttonhover, 10, 105);
        } else if (mainMenuSelect === 2) {
            ctx.drawImage(buttonhover, 10, 165);
        } else if (mainMenuSelect === 3) {
            ctx.drawImage(buttonhover, 10, 225);
        }
    }
}

function controlsNotEqual() {
    for (let i = 0; i < controls.length; i++) {
        for (let j = i + 1; j < controls.length; j++) {
            if (controls[i] === controls[j]) {
                controls = ["d", "f", "j", "k"];
            }
        }
    }
}

function startGame() {
    startSong();
    controlsNotEqual();
    gameState = "gameLoop";
}