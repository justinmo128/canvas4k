class Song {
    constructor(title, artist, charter, music, offset, bpm, difficulty, notes) {
        this.title = title;
        this.artist = artist;
        this.charter = charter;
        this.audio = new Audio(`songs/${title}/${music}`);
        this.audio.volume = 0.4;
        this.songoffset = offset, // Length of the beginning of the sound file (where metadata is stored) in ms
        this.bpm = bpm;
        this.crotchet = 60000 / bpm, // How long a beat is in ms
        this.difficulty = difficulty;
        this.notes = notes;
        this.starttime;
        this.songposition = 0; // Song position in ms
    }
    startSong() {
        accuracy = 0;
        combo = 0;
        maxCombo = 0;
        judgeCount = {
            marvelous: 0,
            superb: 0,
            great: 0,
            uhh: 0,
            bruh: 0,
            miss: 0,
            ok: 0,
            notgood: 0
        }
        lastJudgment = "";
        currentSong = song[mainMenuSelect]
        lastbeat = 0;
        this.audio.pause();
        this.audio.currentTime = 0;
        this.starttime = performance.now() + this.crotchet * 4;
        setTimeout(() => {
            setTimeout(() => {
                this.audio.play();
            },
            audioOffset)     
        },
        this.crotchet * 4);
    }
    updateSong() {
        this.songposition = (currentTime - (this.starttime + this.songoffset));
        if (this.songposition > lastbeat + this.crotchet) {
            lastbeat = lastbeat + this.crotchet;
        }
        if (this.songposition > (this.audio.duration + 1) * 1000) {
            this.endSong();
        }
    }
    endSong() {
        gameState = "songselect"
        this.audio.currentTime = 0;
        this.audio.pause();
    }
}

class Note {
    constructor(dir, time) {
        this.dir = dir; // 0 - left, 1 - down, 2 - up, 3 - right
        this.time = time;
        this.isHit = false;
        this.y;
    }
    update() {
        // Calculate y
        // noteTime - song.songposition is the distance from the receptor
        if (downscroll) {
            this.y = 400 - ((this.time - currentSong.songposition) * (scrollSpeed / 100) + visualOffset); 
        } else {
            this.y = ((this.time - currentSong.songposition) * (scrollSpeed / 100) + visualOffset);
        }
        // Check if player missed the note
        if (currentSong.songposition >= this.time + 180 && !this.isHit) {
            judgeCount.miss++;
            lastJudgment = "MISS";
            combo = 0;
            this.isHit = true;
        }
    }
    draw() {
        if (this.isHit === false) {
            if (this.dir == 0) {
                ctx.fillStyle = "purple";
                ctx.fillRect(204, this.y, 50, 50);
            } else if (this.dir == 1) {
                ctx.fillStyle = "cyan";
                ctx.fillRect(264, this.y, 50, 50);
            } else if (this.dir == 2) {
                ctx.fillStyle = "lime";
                ctx.fillRect(324, this.y, 50, 50);
            } else if (this.dir == 3) {
                ctx.fillStyle = "red";
                ctx.fillRect(384, this.y, 50, 50);
            }
        }
    }
}

class Hold {
    constructor(dir, start, startMeasure, startSnap) {
        this.dir = dir; // 0 - left, 1 - down, 2 - up, 3 - right
        this.start = start;
        this.isHit = false;
        this.fullyHeld = false;
        this.startY;
        this.endY;
        this.tailLength;
        this.startMeasure = startMeasure;
        this.startSnap = startSnap;
        this.end;

        let amountMeasures = currentSong.notes.length;
        findEnd:
        for (let i = startMeasure; i < amountMeasures; i++) {
            let snap = currentSong.notes[i].length;
            if (i === startMeasure) {
                for (let j = startSnap; j < snap; j++) { 
                    if (currentSong.notes[i][j].charAt(this.dir) == 3) {
                        this.end = (i + j / snap) * 4 * currentSong.crotchet;
                        console.log(this.start, this.end, this.dir)
                        break findEnd;
                    }
                }
            } else {
                if (currentSong.notes[i][j].charAt(this.dir) == 3) {
                    this.end = (i + j / snap) * 4 * currentSong.crotchet;
                    console.log(this.start, this.end, this.dir)
                    break findEnd;
                }
            }
        };
        
    }
    update() {
        // Calculate y
        // noteTime - song.songposition is the distance from the receptor
        if (downscroll) {
            this.startY = 400 - ((this.start - currentSong.songposition) * (scrollSpeed / 100) + visualOffset); 
            this.endY = 400 - ((this.end - currentSong.songposition) * (scrollSpeed / 100) + visualOffset); 
            this.tailLength = this.startY - this.endY;
        } else {
            this.startY = ((this.start - currentSong.songposition) * (scrollSpeed / 100) + visualOffset);
            this.endY = ((this.end - currentSong.songposition) * (scrollSpeed / 100) + visualOffset);
            this.tailLength = this.startY - this.endY + 50;
        }
        // Check if player missed the note
        if (currentSong.songposition >= this.time + 180 && !this.isHit) {
            judgeCount.miss++;
            lastJudgment = "MISS";
            combo = 0;
            this.isHit = true;
        }
    }
    draw() {
        // Draw notes
        if (this.isHit === false) {
            if (this.dir == 0) {
                ctx.fillStyle = "purple";
                ctx.fillRect(204, this.startY, 50, 50);
            } else if (this.dir == 1) {
                ctx.fillStyle = "cyan";
                ctx.fillRect(264, this.startY, 50, 50);
            } else if (this.dir == 2) {
                ctx.fillStyle = "lime";
                ctx.fillRect(324, this.startY, 50, 50);
            } else if (this.dir == 3) {
                ctx.fillStyle = "red";
                ctx.fillRect(384, this.startY, 50, 50);
            }
        }
        // Draw end tails
        if (this.fullyHeld === false) {
            if (this.dir == 0) {
                ctx.fillStyle = "gray";
                ctx.fillRect(209, this.endY, 40, this.tailLength);
            } else if (this.dir == 1) {
                ctx.fillStyle = "gray";
                ctx.fillRect(269, this.endY, 40, this.tailLength);
            } else if (this.dir == 2) {
                ctx.fillStyle = "gray";
                ctx.fillRect(329, this.endY, 40, this.tailLength);
            } else if (this.dir == 3) {
                ctx.fillStyle = "gray";
                ctx.fillRect(389, this.endY, 40, this.tailLength);
            }
        }
    }
}

// Song Variables
let currentSong;
let lastbeat;
const tickSound = new Audio('snd/tick.mp3');
tickSound.volume = 0.4;
let notes = [];
let holds = [];

function createNotes() {
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
    let start;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            for (let k = 0; k < 4; k++) {
                if (currentSong.notes[i][j].charAt(k) == 2) {
                    start = (i + j / snap) * 4 * currentSong.crotchet;
                    holds[index] = new Hold(k, start, i, j);
                    index++;
                }
            }
        }
    }
}