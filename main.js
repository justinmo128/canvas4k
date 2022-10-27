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
let controls = ["d", "f", "j", "k"];
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
    requestAnimationFrame(draw);
    currentTime = performance.now();
}

// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    controlsHandler(keyPressed);
    if (gameState === "start" || gameState === "controls") {
        mainMenuHandler(keyPressed);
    } else if (gameState === "gameLoop") {
        if (keyPressed === controls[0]) {
            leftIsHeld = true;
        } else if (keyPressed === controls[1]) {
            downIsHeld = true;
        } else if (keyPressed === controls[2]) {
            upIsHeld = true;
        } else if (keyPressed === controls[3]) {
            rightIsHeld = true;
        }
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;
    if (keyPressed === controls[0]) {
        leftIsHeld = false;
    } else if (keyPressed === controls[1]) {
        downIsHeld = false;
    } else if (keyPressed === controls[2]) {
        upIsHeld = false;
    } else if (keyPressed === controls[3]) {
        rightIsHeld = false;
    }
})