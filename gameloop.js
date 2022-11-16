function startGame() {
    startSong();
    // createNotes();
    controlsNotEqual();
    gameState = "gameLoop";
}

function gameLoop() {
    // Logic
    song.updateSong();
    // Draw
    drawMainComponents();
    calcNotes();
    drawReceptors();
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