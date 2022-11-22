// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

// Global Variables (unchanged)
const judgements = {
    marvelous: 22,
    superb: 45,
    great: 90,
    uhh: 135,
    bruh: 180
};

// Global Variables
let controls = ["d", "f", "j", "k"];
let held = [false, false, false, false];
let keyUsed = [false, false, false, false];
let accuracy = 0;
let combo = 0;
let maxCombo = 0;
let judgeCount = {
    marvelous: 0,
    superb: 0,
    great: 0,
    uhh: 0,
    bruh: 0,
    miss: 0,
    ok: 0,
    notgood: 0
}
let currentTime;
let lastFrameOccurence = performance.now();
let gameState = "topMenu";
let mainMenuSelect = 0;
let controlSel = false;
let downscroll = true;

// Draw Function
window.addEventListener("load", draw);
function draw() {
    if (gameState === "topMenu") {
        drawTopMenu();
    } else if (gameState === "controls") {
        drawControlsScreen();
    } else if (gameState === "loading") {
        drawLoadingScreen();
    } else if (gameState === "songselect") {
        drawSongSelectMenu();
    } else if (gameState === "loadingNotes") {
        loadingNotes();
    } else if (gameState === "gameLoop") {
        gameLoop();
    };
    // Request Animation Frame
    // requestAnimationFrame(draw);
    setTimeout(draw, 0);
    currentTime = performance.now();
}

function drawMainComponents() {
    // Background
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // FPS
    ctx.textAlign = "left"
    let fps = 1000 / (currentTime - lastFrameOccurence);
    fps = Math.round(fps);
    lastFrameOccurence = currentTime;
    ctx.font = "14px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${fps}`, 10, 20)
}