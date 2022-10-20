function gameLoop() {
    drawGame();
}

// Draw Game Elements
function drawGame() {
    ctx.fillStyle = "rgb(24,24,24)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    drawReceptors();
    drawNotes();
}

function drawReceptors() {
    // Left receptor
    if (leftIsHeld) {
        ctx.fillStyle = "purple";
        ctx.fillRect(204, 400, 50, 50);
    } else {
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 2;
        ctx.strokeRect(204, 400, 50, 50);
    }
    // Down receptor
    if (downIsHeld) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(264, 400, 50, 50);
    } else {
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 2;
        ctx.strokeRect(264, 400, 50, 50);
    }
    // Up receptor
    if (upIsHeld) {
        ctx.fillStyle = "lime";
        ctx.fillRect(324, 400, 50, 50);
    } else {
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(324, 400, 50, 50);
    }
    // Right receptor
    if (rightIsHeld) {
        ctx.fillStyle = "red";
        ctx.fillRect(384, 400, 50, 50);
    } else {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(384, 400, 50, 50);
    }
}

// Move notes
function drawNotes() {
    if (currentTime > 1000) {
        ctx.fillStyle = "purple";
        ctx.fillRect(204, 400, 50, 50);
    }
}