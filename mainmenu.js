function mainMenu() {
    drawMainComponents();
    drawStart();
    let buttonhover = new Image(260, 40);
    buttonhover.src = 'img/buttonhover.png';
    if (mainMenuSelect === "start") {
        ctx.drawImage(buttonhover, 10, 169)
    } else if (mainMenuSelect === "controls") {
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
    ctx.fillText(`${leftKey}, ${downKey}, ${upKey}, ${rightKey}`, 330, 120);
}

function mainMenuHandler(keyPressed) {
    if (keyPressed === "ArrowDown" || keyPressed === "ArrowUp") {
        if (mainMenuSelect === "start") {
            mainMenuSelect = "controls";
        } else {
            mainMenuSelect = "start";
        }
    }
    if (keyPressed === "Enter") {
        if (mainMenuSelect === "start") {
            startGame();
        } else {
            gameState = "controls";
        }
    }
}

function controlsScreen() {
    drawMainComponents();
    drawStart();
    ctx.fillStyle = "#005F70";
    ctx.fillRect(20, 120, 600, 240);
    ctx.font = "30px Roboto";
    ctx.fillStyle = "white";
    controlsHandler();
}

function controlsHandler(keyPressed) {
}

function startGame() {
    startSong();
    gameState = "gameLoop";
}