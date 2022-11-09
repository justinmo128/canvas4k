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
    controlsHandler(keyPressed);
    if (gameState === "start" || gameState === "controls") {
        mainMenuHandler(keyPressed);
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