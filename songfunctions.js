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
    constructor(dir, start) {
        this.dir = dir; // 0 - left, 1 - down, 2 - up, 3 - right
        this.start = start;
        this.isHit = false;
        this.y;
    }
    update() {
        // Calculate y
        // noteTime - song.songposition is the distance from the receptor
        if (downscroll) {
            this.y = 400 - ((this.start - currentSong.songposition) * (scrollSpeed / 100) + visualOffset); 
        } else {
            this.y = ((this.start - currentSong.songposition) * (scrollSpeed / 100) + visualOffset);
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

// Song Variables
let currentSong;
let lastbeat;
const tickSound = new Audio('snd/tick.mp3');
tickSound.volume = 0.4;
let notes = [];
let holds = [];

function createNotes() {
    gameState = "loadingNotes";
    let amountMeasures = currentSong.notes.length;
    let noteIndex = 0;
    let holdIndex = 0;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            for (let k = 0; k < 4; k++) {
                if (currentSong.notes[i][j].charAt(k) == 1) {
                    let noteTime = (i + j / snap) * 4 * currentSong.crotchet;
                    notes[noteIndex] = new Note(k, noteTime);
                    noteIndex++;
                } else if (currentSong.notes[i][j].charAt(k) == 2) {
                    let start = (i + j / snap) * 4 * currentSong.crotchet;
                    holds[holdIndex] = new Hold(k, start);
                    holdIndex++;
                }
            }
        }
    }
    gameState = "gameLoop";
}