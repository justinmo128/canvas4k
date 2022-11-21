// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

// Global Variables (unchanged)
const judgments = {
    marvelous: 22,
    perfect: 35,
    great: 90,
    good: 135,
    bad: 180
};

// Global Variables
let controls = ["d", "f", "j", "k"];
let held = [false, false, false, false];
// let accuracy;
// let combo;
// let maxCombo;
// let judgeCount = {
//     marvelous: 0,
//     perfect: 0,
//     great: 0,
//     good: 0,
//     bad: 0,
//     miss: 0,
//     ok: 0,
//     notgood: 0
// }
let currentTime;
let lastFrameOccurence = performance.now();
let gameState = "start";
let mainMenuSelect = 0;
let controlSel = false;
let downscroll = true;

// Draw Function
window.addEventListener("load", draw);
function draw() {
    if (gameState === "start") {
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
    let fps = 1000 / (currentTime - lastFrameOccurence);
    fps = Math.round(fps);
    lastFrameOccurence = currentTime;
    ctx.font = "14px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${fps}`, 10, 20)
}