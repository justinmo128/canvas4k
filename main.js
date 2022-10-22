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
let currentTime;
let gameState = "start";

// Draw Function
window.addEventListener("load", draw);

function draw() {
    if (gameState === "start") {
        startScreen();
    } else if (gameState === "gameLoop") {
        gameLoop();
    }
    // Request Animation Frame
    requestAnimationFrame(draw);
}

// Key down handler
window.addEventListener("keydown", (e) => {
    if (gameState === "start") {
        gameState = "gameLoop";
    }
    let keyPressed = e.key;
    if (keyPressed === 'd' || keyPressed === 'ArrowLeft') {
        leftIsHeld = true;
    } else if (keyPressed === 'f' || keyPressed === 'ArrowDown') {
        downIsHeld = true;
    } else if (keyPressed === 'j' || keyPressed === 'ArrowUp') {
        upIsHeld = true;
    } else if (keyPressed === 'k' || keyPressed === 'ArrowRight') {
        rightIsHeld = true;
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;
    if (keyPressed === 'd' || keyPressed === 'ArrowLeft') {
        leftIsHeld = false;
    } else if (keyPressed === 'f' || keyPressed === 'ArrowDown') {
        downIsHeld = false;
    } else if (keyPressed === 'j' || keyPressed === 'ArrowUp') {
        upIsHeld = false;
    } else if (keyPressed === 'k' || keyPressed === 'ArrowRight') {
        rightIsHeld = false;
    }
})