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
        this.y = ((this.time - currentSong.songposition) * (scrollSpeed / 100) + visualOffset);
        if (downscroll) {
            this.y = 400 - this.y; 
        } else {
            this.y = 30 + this.y;
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
        if (!this.isHit) {
            if (this.dir == 0) {
                ctx.fillStyle = "purple";
            } else if (this.dir == 1) {
                ctx.fillStyle = "cyan";
            } else if (this.dir == 2) {
                ctx.fillStyle = "lime";
            } else if (this.dir == 3) {
                ctx.fillStyle = "red";
            }
            ctx.fillRect(204 + this.dir * 60, this.y, 50, 50);
        }
    }
    judge(hitTime, key) {
        if (!this.isHit && this.dir === key && !keyUsed[key] && hitTime <= this.time + 180 && hitTime >= this.time - 180) { 
        // Has the note already been hit? Does the note match the key pressed? Is the hit time within the notes leniency?
            keyUsed[key] = true;
            this.isHit = true;
            if (hitTime <= this.time + 90) {
                combo++;
                if (hitTime <= this.time + 22.5 &&
                hitTime >= this.time - 22.5) {
                    judgeCount.marvelous++;
                    lastJudgment = "MARVELOUS";
                } else if (hitTime <= this.time + 45 &&
                hitTime >= this.time - 45) {
                    judgeCount.superb++;
                    lastJudgment = "SUPERB";
                } else {
                    judgeCount.great++;
                    lastJudgment = "GREAT";
                } 
            } else {
                combo = 0;
                if (hitTime <= this.time + 135 &&
                hitTime >= this.time - 135) {
                    judgeCount.uhh++;
                    lastJudgment = "UHH";
                } else if (hitTime <= this.time + 180 &&
                hitTime >= this.time - 180) {
                    judgeCount.bruh++;
                    lastJudgment = "BRUH";
                }
            }
            return true;
        }
    }
}

class Hold {
    constructor(dir, start, startMeasure, startSnap) {
        this.dir = dir; // 0 - left, 1 - down, 2 - up, 3 - right
        this.start = start;
        this.isHit = false;
        this.isHolding = false;
        this.fullyHeld = false;
        this.render = true;
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
            if (i > startMeasure) {
                startSnap = 0;
            }
            for (let j = startSnap; j < snap; j++) { 
                if (currentSong.notes[i][j].charAt(this.dir) == 3) {
                    this.end = (i + j / snap) * 4 * currentSong.crotchet;
                    this.length = this.end - this.start;
                    break findEnd;
                }
            }
        };
    }
    update() {
        // Calculate y
        // noteTime - song.songposition is the distance from the receptor
        this.startY = (this.start - currentSong.songposition) * (scrollSpeed / 100) + visualOffset;
        this.endY = (this.end - currentSong.songposition) * (scrollSpeed / 100) + visualOffset;
        if (downscroll) {
            this.startY = 400 - this.startY; 
            this.endY = 400 - this.endY;
            this.tailLength = this.startY - this.endY - 50;
        } else {
            this.startY = 30 + this.startY;
            this.endY = 30 + this.endY;
            this.tailLength = this.endY - this.startY - 50;
        }
        // Check if player missed the note
        if (currentSong.songposition >= this.time + 180 && !this.isHit) {
            judgeCount.miss++;
            lastJudgment = "MISS";
            combo = 0;
            this.isHit = true;
        }
        // Check if fully held (Holds do not count for combo or combo break, but do count for accuracy)
        if (this.isHolding && currentSong.songposition > this.end && !this.fullyHeld) {
            console.log("Hi")
            this.fullyHeld = true;
            this.render = false;
            judgeCount.ok++;
        } else if (currentSong.songposition > this.end && !this.fullyHeld) {
            console.log("Bruh")
            this.fullyHeld = true;
            judgeCount.notgood++;
        }
    }
    draw() {
        // Draw notes
        if (!this.isHit) {
            if (this.dir == 0) {
                ctx.fillStyle = "purple";
            } else if (this.dir == 1) {
                ctx.fillStyle = "cyan";
            } else if (this.dir == 2) {
                ctx.fillStyle = "lime";
            } else if (this.dir == 3) {
                ctx.fillStyle = "red";
            }
            ctx.fillRect(204 + this.dir * 60, this.startY, 50, 50);
        }
        // Draw end tails
        if (this.render) {
            ctx.fillStyle = "gray";
            if (downscroll) {
                ctx.fillRect(209 + this.dir * 60, this.endY + 50, 40, this.tailLength);
            } else {
                ctx.fillRect(209 + this.dir * 60, this.startY + 50, 40, this.tailLength);
            }
        }
        // If it's currently being held, draw a black rectangle
        if (this.isHolding && held[this.dir]) {
            ctx.fillStyle = "black";
            if (downscroll) {
                ctx.fillRect(204 + this.dir * 60, 450, 50, 50);
            } else {
                ctx.fillRect(204 + this.dir * 60, 0, 50, 50);
            }
        }
    }
    judge(hitTime, key) {
        // Starting note
        if (!this.isHit && this.dir === key && !keyUsed[key] && hitTime <= this.start + 180 && hitTime >= this.start - 180) { 
        // Has the note already been hit? Does the note match the key pressed? Is the hit time within the notes leniency?
            keyUsed[key] = true;
            this.isHit = true;
            this.isHolding = true;
            if (hitTime <= this.start + 90) {
                combo++;
                if (hitTime <= this.start + 22.5 &&
                hitTime >= this.start - 22.5) {
                    judgeCount.marvelous++;
                    lastJudgment = "MARVELOUS";
                } else if (hitTime <= this.start + 45 &&
                hitTime >= this.start - 45) {
                    judgeCount.superb++;
                    lastJudgment = "SUPERB";
                } else {
                    judgeCount.great++;
                    lastJudgment = "GREAT";
                } 
            } else {
                combo = 0;
                if (hitTime <= this.start + 135 &&
                hitTime >= this.start - 135) {
                    judgeCount.uhh++;
                    lastJudgment = "UHH";
                } else if (hitTime <= this.start + 180 &&
                hitTime >= this.start - 180) {
                    judgeCount.bruh++;
                    lastJudgment = "BRUH";
                }
            }
            return true;
        }
    }
    releaseHandler(key) {
        setTimeout(() => {
            if (!held[key] && key === this.dir) {
                this.isHolding = false;
            }
        }, currentSong.crotchet / 4)
    }
}