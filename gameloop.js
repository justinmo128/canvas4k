function startGame() {
    song[mainMenuSelect].startSong();
    controlsNotEqual();
    gameState = "loadingNotes";
    createStandardNotes();
    createHolds();
    createMines();
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

function createMines() {
    let amountMeasures = currentSong.notes.length;
    let index = 0;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            for (let k = 0; k < 4; k++) {
                if (currentSong.notes[i][j].charAt(k) == "M") {
                    let time = (i + j / snap) * 4 * currentSong.crotchet;
                    mines[index] = new Mine(k, time);
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
    for (let i of holds) {
        i.update();
        i.draw();
    }
    drawReceptors();
    for (let i of notes) {
        i.update();
        i.draw();
    }
    for (let i of mines) {
        i.update();
        i.draw();
    }
    drawSongProgress();
    drawLife();
    drawJudgeCount();
    drawAccuracy();
    drawCombo();
    drawJudgment();
}

function calcAccuracy() {
    let totalNotesHit = 0;
    for (let i of Object.values(judgeCount)) {
        totalNotesHit += i;
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
const receptorImg = new Image();
receptorImg.src = 'img/receptor-down.png';

function drawReceptors() {
    if (downscroll) {
        receptorY = 400;
    } else {
        receptorY = 30;
    }
    quickDrawRect("#400040", 204, receptorY, true);
    quickDrawRect("purple", 204, receptorY, held[0]);
    quickDrawRect("#008080", 264, receptorY, true);
    quickDrawRect("cyan", 264, receptorY, held[1]);
    quickDrawRect("#008000", 324, receptorY, true);
    quickDrawRect("lime", 324, receptorY, held[2]);
    quickDrawRect("#800000", 384, receptorY, true);
    quickDrawRect("red", 384, receptorY, held[3]);
    // if (downscroll) {
    //     receptorY = 393;
    // } else {
    //     receptorY = 37;
    // }
    // for (let i = 0; i < 4; i++) {
    //     ctx.save();
    //     ctx.drawImage(receptorImg, 197 + i * 60, receptorY, 64, 64);
    //     ctx.restore();
    // }
}

function drawSongProgress() {
    ctx.fillStyle = "gray";
    ctx.fillRect(150, 460, 340, 10);
    ctx.fillStyle = "#007F96";
    let songProgress = currentSong.audio.currentTime / currentSong.audio.duration
    ctx.fillRect(150, 460, songProgress * 340, 10);
    let songMin = Math.floor(currentSong.audio.duration / 60);
    let songSec = Math.round(currentSong.audio.duration % 60);
    ctx.fillStyle = "white";
    ctx.fillText(`${songMin}:${songSec}`, 495, 470);
    ctx.textAlign = "center";
    determineDifficulty(currentSong.difficulty);
    ctx.fillText(currentSong.title, 320, 470);
}

function drawLife() {
    // Logic
    if (life > 100) {
        life = 100;
    } else if (life <= 0) {
        currentSong.endSong();
    }
    // Draw
    ctx.fillStyle = "#404040";
    ctx.fillRect(630, 40, 5, 400);
    ctx.fillStyle = "#007F96";
    ctx.fillRect(630, 440, 5, life / 100 * -400);
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
    ctx.textAlign = "right";
    ctx.font = "15px Roboto"
    ctx.fillStyle = "white";
    for (let i = 0; i < Object.values(judgeCount).length; i++) {
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
    ctx.font = "10px Roboto";
    ctx.textAlign = "right";
    ctx.fillText(`${error.toFixed(2)}ms`, 400, 280)
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