function gameLoop() {
    // Logic
    updateSong();
    currentTime = performance.now();
    // Draw
    drawMainComponents();
    drawReceptors();
}

function drawMainComponents() {
    // Background
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // FPS
    let fps = 1000 / (currentTime - lastFrameOccurence);
    fps = Math.round(fps);
    lastFrameOccurence = currentTime;
    ctx.font = "14px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${fps}`, 10, 20)
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