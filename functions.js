function gameLoop() {
    // Logic
    song.updateSong();
    // Draw
    drawMainComponents();
    calcNotes();
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
    if (held[0]) {
        ctx.fillStyle = "purple";
        ctx.fillRect(204, 400, 50, 50);
    } else {
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 2;
        ctx.strokeRect(204, 400, 50, 50);
    }
    // Down receptor
    if (held[1]) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(264, 400, 50, 50);
    } else {
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 2;
        ctx.strokeRect(264, 400, 50, 50);
    }
    // Up receptor
    if (held[2]) {
        ctx.fillStyle = "lime";
        ctx.fillRect(324, 400, 50, 50);
    } else {
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(324, 400, 50, 50);
    }
    // Right receptor
    if (held[3]) {
        ctx.fillStyle = "red";
        ctx.fillRect(384, 400, 50, 50);
    } else {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(384, 400, 50, 50);
    }
}

window.addEventListener("keydown", judge);
function judge() {

}