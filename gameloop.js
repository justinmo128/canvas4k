function startGame() {
    song[mainMenuSelect].startSong();
    controlsNotEqual();
    gameState = "loadingNotes";
    createNotes();
    gameState = "gameLoop";
}

function createNotes() {
    let amountMeasures = currentSong.notes.length;
    let noteIndex = 0;
    let holdIndex = 0;
    let mineIndex = 0;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            for (let k = 0; k < 4; k++) {
                if (currentSong.notes[i][j].charAt(k) == 1) {
                    let noteTime = (i + j / snap) * 4 * currentSong.crotchet;
                    notes[noteIndex] = new Note(k, noteTime);
                    noteIndex++;
                } else if (currentSong.notes[i][j].charAt(k) == 2 || currentSong.notes[i][j].charAt(k) == 4) {
                    let start = (i + j / snap) * 4 * currentSong.crotchet;
                    holds[holdIndex] = new Hold(k, start, i, j);
                    holdIndex++;
                } else if (currentSong.notes[i][j].charAt(k) == "M") {
                    let time = (i + j / snap) * 4 * currentSong.crotchet;
                    mines[mineIndex] = new Mine(k, time);
                    mineIndex++;
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
    calcGrades();
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
    drawGrades();
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

    comboBreaks = judgeCount.uhh + judgeCount.bruh + judgeCount.miss;
}


function calcGrades() {
    if (accuracy < 60) {
        grade = "D";
    } else if (accuracy < 70) {
        grade = "C";
    } else if (accuracy < 80) {
        grade = "B";
    } else if (accuracy < 93) {
        grade = "A";
    } else if (accuracy < 100) {
        grade = "AA";
    } else {
        grade = "S";
    }

    comboBreaks = judgeCount.uhh + judgeCount.bruh + judgeCount.miss;
    if (comboBreaks === 0) {
        if (judgeCount.great === 0 && judgeCount.superb === 0) {
            comboGrade = "MFC"; // Marv. Full Combo
        } else if (judgeCount.great === 0) {
            comboGrade = "SFC"; // Superb Full Combo
        } else {
            comboGrade = "FC";
        }
    } else if (comboBreaks < 10) {
        comboGrade = "SDCB"; // Single Digit Combo Break
    } else {
        comboGrade = "Clear";
    }
}

function drawGrades() {
    ctx.textAlign = "right";
    ctx.font = "20px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`${accuracy.toFixed(2)}% (${grade})`, 200, 200);
    ctx.font = "15px Roboto";
    ctx.fillText(`Combo Breaks: ${comboBreaks} (${comboGrade})`, 200, 170);
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