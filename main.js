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
let leftIsHeld;
let downIsHeld;
let upIsHeld;
let rightIsHeld;
let leftKey = "d";
let downKey = "f";
let upKey = "j";
let rightKey = "k";
let currentTime;
let lastFrameOccurence = performance.now();
let gameState = "start";
let mainMenuSelect = "start";

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
    requestAnimationFrame(draw);
    currentTime = performance.now();
}

// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (gameState === "start") {
        mainMenuHandler(keyPressed);
    } else if (gameState === "gameLoop") {
        if (keyPressed === leftKey) {
            leftIsHeld = true;
        } else if (keyPressed === downKey) {
            downIsHeld = true;
        } else if (keyPressed === upKey) {
            upIsHeld = true;
        } else if (keyPressed === rightKey) {
            rightIsHeld = true;
        }
    } else if (gameState === "controls") {
        leftKey = keyPressed;
        gameState = "start";
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;
    if (keyPressed === leftKey) {
        leftIsHeld = false;
    } else if (keyPressed === downKey) {
        downIsHeld = false;
    } else if (keyPressed === upKey) {
        upIsHeld = false;
    } else if (keyPressed === rightKey) {
        rightIsHeld = false;
    }
})