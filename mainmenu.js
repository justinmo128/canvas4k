const buttonhover = new Image(260, 40);
buttonhover.src = 'img/buttonhover.png';

function drawStart() {
    ctx.textAlign = "left"
    ctx.fillStyle = "#007F96";
    ctx.fillRect(cnv.width - cnv.width / 2, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Roboto";
    ctx.fillText("Canvas4K", 330, 60);
    ctx.font = "22px Roboto";
    ctx.fillText(`Your controls:`, 330, 90);
    ctx.fillText(`${controls[0]}, ${controls[1]}, ${controls[2]}, ${controls[3]}`, 330, 120);
    ctx.fillText("Use Arrow Keys, Enter and Esc", 330, 440);
    ctx.fillText("to navigate the menu.", 330, 470);
}

function drawTopMenu() {
    drawMainComponents();
    drawStart();
    ctx.drawImage(buttonhover, 30, 99 + mainMenuSelect * 50);
    if (mainMenuSelect > 1) {
        ctx.font = "30px Roboto";
        ctx.fillText("<", 10, 130 + mainMenuSelect * 50)
        ctx.fillText(">", 295, 130 + mainMenuSelect * 50)
    }
    ctx.font = "30px Roboto";
    ctx.fillText("Start", 55, 130);
    ctx.fillText("Controls", 55, 180);
    ctx.textAlign = "center";
    ctx.fillText(`Downscroll: ${downscroll}`, 160, 230);
    ctx.fillText(`Scroll Speed: ${scrollSpeed}`, 160, 280);
    ctx.fillText(`Visual Offset: ${visualOffset}`, 160, 330);
    ctx.fillText(`Audio Offset: ${audioOffset}`, 160, 380);
    ctx.textAlign = "left";
    ctx.font = "22px Roboto";
    ctx.fillText("Higher = Arrows appear later", 330, 330);
    ctx.fillText("Higher = Audio starts later", 330, 365);
    ctx.fillText("Both offsets in milliseconds", 330, 400);
}

function drawControlsScreen() {
    drawMainComponents();
    drawStart();
    drawControlSelect();
    if (mainMenuSelect === 0) {
        quickDrawRect("purple", 20, 40, true);
    } else if (mainMenuSelect === 1) {
        quickDrawRect("cyan", 20, 100, true);
    } else if (mainMenuSelect === 2) {
        quickDrawRect("lime", 20, 160, true);
    } else if (mainMenuSelect === 3) {
        quickDrawRect("red", 20, 220, true);
    } else if (mainMenuSelect === 4) {
        ctx.drawImage(buttonhover, 10, 369)
    }
    ctx.font = "30px Roboto";
    ctx.textAlign = "left"
    // Left
    quickDrawRect("purple", 20, 40, false);
    ctx.fillStyle = "white";
    ctx.fillText("Left", 90, 75);
    // Down
    quickDrawRect("cyan", 20, 100, false);
    ctx.fillStyle = "white";
    ctx.fillText("Down", 90, 135);
    // Up
    quickDrawRect("lime", 20, 160, false);
    ctx.fillStyle = "white";
    ctx.fillText("Up", 90, 195);
    // Right
    quickDrawRect("red", 20, 220, false);
    ctx.fillStyle = "white";
    ctx.fillText("Right", 90, 255);
    // Back
    ctx.fillStyle = "white";
    ctx.fillText("Back", 35, 400);
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