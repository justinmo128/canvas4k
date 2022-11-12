// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

// Global Variables (unchanged)
const judgments = {
    marvelous: 22,
    perfect: 45,
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
let buttonhover = new Image(260, 40);
buttonhover.src = 'img/buttonhover.png';

// Draw Function
window.addEventListener("load", draw);

function draw() {
    if (gameState === "start") {
        mainMenu();
    } else if (gameState === "gameLoop") {
        gameLoop();
    } else if (gameState === "controls") {
        controlsScreen();
    }
    // Request Animation Frame
    // requestAnimationFrame(draw);
    setTimeout(draw, 1);
    currentTime = performance.now();
}

// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (controlSel) {
        controlsHandler(keyPressed);
    } else if (gameState === "start" || gameState === "controls") {
        mainMenuHandler(keyPressed);
    } else if (gameState ===  "gameLoop" && keyPressed === "Escape") {
        song.endSong();
    }
        
    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i] && gameState === "gameLoop") {
            held[i] = true;
        }
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;

    for (let i = 0; i < 4; i++) {
        if (keyPressed === controls[i] && gameState === "gameLoop") {
            held[i] = false;
        }
    }
})