function startGame() {
    song[mainMenuSelect].startSong();
    controlsNotEqual();
    gameState = "loadingNotes";
    createStandardNotes();
    createHolds();
    gameState = "gameLoop";
}

function createStandardNotes() {
    let amountMeasures = currentSong.notes.length;
    let index = 0;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            for (let k = 0; k < 4; k++) {
                if (currentSong.notes[i][j].charAt(k) == 1) {
                    let noteTime = (i + j / snap) * 4 * currentSong.crotchet;
                    notes[index] = new Note(k, noteTime);
                    index++;
                }
            }
        }
    }
}

function createHolds() {
    let amountMeasures = currentSong.notes.length;
    let index = 0;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            for (let k = 0; k < 4; k++) {
                if (currentSong.notes[i][j].charAt(k) == 2 || currentSong.notes[i][j].charAt(k) == 4) {
                    let start = (i + j / snap) * 4 * currentSong.crotchet;
                    holds[index] = new Hold(k, start, i, j);
                    index++;
                }
            }
        }
    }
}

function loadingNotes() {
    drawMainComponents();
    drawReceptors();
}

function gameLoop() {
    // Logic
    currentSong.updateSong();
    calcAccuracy();
    // Draw
    drawMainComponents();
    for (let i = 0; i < notes.length; i++) {
        notes[i].update();
        notes[i].draw();
    }
    for (let i = 0; i < holds.length; i++) {
        holds[i].update();
        holds[i].draw();
    }
    drawReceptors();
    drawJudgeCount();
    drawAccuracy();
    drawCombo();
    drawJudgment();
}

function calcAccuracy() {
    let totalNotesHit = 0;
    for (let i = 0; i < Object.values(judgeCount).length; i++) {
        totalNotesHit += Object.values(judgeCount)[i];
    };

    // Assign each judgement an amount of points, then calculate the average amount of points
    let avg = (judgeCount.marvelous * 2 + judgeCount.superb * 2 + judgeCount.great * 1 + judgeCount.uhh * 0 + judgeCount.bruh * -4 + judgeCount.miss * -8 + judgeCount.ok * 2 + judgeCount.notgood * -8) / totalNotesHit; 

    accuracy = Math.round(avg / 2 * 10000) / 100;
    if (!accuracy) {
        accuracy = 0;
    }
}

function drawAccuracy() {
    ctx.textAlign = "right";
    ctx.font = "20px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`${accuracy.toFixed(2)}%`, 200, 200);
}

let receptorY;
function drawReceptors() {
    if (downscroll) {
        receptorY = 400;
    } else {
        receptorY = 30;
    }
    quickDrawRect("purple", 204, receptorY, held[0]);
    quickDrawRect("cyan", 264, receptorY, held[1]);
    quickDrawRect("lime", 324, receptorY, held[2]);
    quickDrawRect("red", 384, receptorY, held[3]);
}

function drawJudgeCount() {
    ctx.fillStyle = "#101010";
    ctx.fillRect(96, 215, 80, 160);
    ctx.fillStyle = "#200000";
    ctx.fillRect(96, 275, 80, 60);
    ctx.textAlign = "left";
    ctx.font = "15px Roboto"
    ctx.fillStyle = "cyan";
    ctx.fillText("MA", 100, 230);
    ctx.fillStyle = "yellow";
    ctx.fillText("SB", 100, 250);
    ctx.fillStyle = "lime";
    ctx.fillText("GR", 100, 270);
    ctx.fillStyle = "#1AB2FF";
    ctx.fillText("UH", 100, 290);
    ctx.fillStyle = "magenta";
    ctx.fillText("BR", 100, 310);
    ctx.fillStyle = "red";
    ctx.fillText("MS", 100, 330);
    ctx.fillStyle = "yellow";
    ctx.fillText("OK", 100, 350);
    ctx.fillStyle = "red";
    ctx.fillText("NG", 100, 370);
    for (let i = 0; i < Object.values(judgeCount).length; i++) {
        ctx.textAlign = "right";
        ctx.font = "15px Roboto"
        ctx.fillStyle = "white";
        ctx.fillText(Object.values(judgeCount)[i], 170, 230 + i * 20);
    }
}

function drawCombo() {
    if (combo > maxCombo) {
        maxCombo = combo;
    }
    ctx.textAlign = "right";
    ctx.font = "15px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`${combo} COMBO`, 380, 240);
}

function drawJudgment() {
    ctx.textAlign = "center";
    ctx.font = "25px Roboto";
    if (lastJudgment === "MARVELOUS") {
        ctx.fillStyle = "cyan";
    } else if (lastJudgment === "SUPERB") {
        ctx.fillStyle = "yellow";
    } else if (lastJudgment === "GREAT") {
        ctx.fillStyle = "lime";
    } else if (lastJudgment === "UHH") {
        ctx.fillStyle = "#1AB2FF";
    } else if (lastJudgment === "BRUH") {
        ctx.fillStyle = "magenta";
    } else if (lastJudgment === "MISS") {
        ctx.fillStyle = "red";
    }
    ctx.fillText(lastJudgment, 320, 270);
}

function quickDrawRect(colour, x, y, fill) {
    if (fill) {
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, 50, 50);
    } else {
        ctx.strokeStyle = colour;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 50, 50);
    }
}