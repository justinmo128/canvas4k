function startGame() {
    song[mainMenuSelect].startSong();
    controlsNotEqual();
    createNotes();
}

function loadingNotes() {
    drawMainComponents();
    drawReceptors();
}

function gameLoop() {
    // Logic
    currentSong.updateSong();
    // Draw
    drawMainComponents();
    for (let i = 0; i < notes.length; i++) {
        notes[i].update();
        notes[i].draw();
    }
    drawReceptors();
    drawJudgeCount();
}

function drawReceptors() {
    let receptorY = 400;
    if (!downscroll) {
        receptorY = 30;
    }
    quickDrawRect("purple", 204, receptorY, held[0]);
    quickDrawRect("cyan", 264, receptorY, held[1]);
    quickDrawRect("lime", 324, receptorY, held[2]);
    quickDrawRect("red", 384, receptorY, held[3]);
}

function drawJudgeCount() {
    ctx.textAlign = "left";
    ctx.font = "15px Roboto"
    ctx.fillStyle = "cyan";
    ctx.fillText("MA", 120, 230);
    ctx.fillStyle = "yellow";
    ctx.fillText("SB", 120, 250);
    ctx.fillStyle = "lime";
    ctx.fillText("GR", 120, 270);
    ctx.fillStyle = "#1AB2FF";
    ctx.fillText("UH", 120, 290);
    ctx.fillStyle = "magenta";
    ctx.fillText("BR", 120, 310);
    ctx.fillStyle = "red";
    ctx.fillText("MS", 120, 330);
    ctx.fillStyle = "yellow";
    ctx.fillText("OK", 120, 350);
    ctx.fillStyle = "red";
    ctx.fillText("NG", 120, 370);
    for (let i = 0; i < Object.values(judgeCount).length; i++) {
        ctx.textAlign = "right";
        ctx.font = "15px Roboto"
        ctx.fillStyle = "white";
        ctx.fillText(Object.values(judgeCount)[i], 170, 230 + i * 20);
    }
}

function quickDrawRect(colour, x, y, fill) {
    if (fill) {
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, 50, 50);
    } else {
        ctx.strokeStyle = colour;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 50, 50);
    }
}