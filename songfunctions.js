class Song {
    constructor(title, music, offset, bpm, notes) {
        this.bpm = bpm;
        this.crotchet = 60000 / bpm, // How long a beat is in ms
        this.songoffset = offset, // Length of the beginning of the sound file (where metadata is stored) in ms
        this.starttime;
        this.songposition = currentTime - (this.starttime + this.songoffset); // Song position in ms
        this.audio = new Audio(`songs/${title}/${music}`);
        this.audio.volume = 0.4;
        this.notes = notes;
    }
    startSong() {
        currentSong = songs[mainMenuSelect]
        lastbeat = 0;
        this.audio.pause();
        this.audio.currentTime = 0;
        setTimeout(() => {
            this.audio.play();
            this.starttime = performance.now();
        },
        this.crotchet * 4);
    }
    updateSong() {
        this.songposition = (currentTime - (this.starttime + this.songoffset));
        if (this.songposition > lastbeat + this.crotchet) {
            lastbeat = lastbeat + this.crotchet;
            console.log("Beat occurred!");
            tickSound.play();
        }
        if (this.songposition > (this.audio.duration + 1) * 1000) {
            this.endSong();
        }
    }
    endSong() {
        loadSongs();
        this.audio.currentTime = 0;
    }
}

class Note {
    constructor(position, type, time) {
        this.position = position;
        this.type = type;
        this.time = time;
        this.isHit = false;
    }
    update() {
        // Calculate y
        // noteTime - song.songposition is the distance from the receptor
        if (downscroll) {
            y = (400 - (noteTime - song.songposition)) * scrollSpeed; 
        } else {
            y = (noteTime - song.songposition) * scrollSpeed;
        }
    }
}

class Hold {
    constructor() {
        // WIP
    }
}

// Song Variables
let currentSong;
let lastbeat;
const tickSound = new Audio('snd/tick.mp3');
tickSound.volume = 0.4;

function createNotes() {
    let amountMeasures = currentSong.notes.length;
    for (let i = 0; i < amountMeasures; i++) {
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            if (currentSong.notes[i][j].charAt(0) == 1) {new Note("left", "normal", 0)}
            else if (currentSong.notes[i][j].charAt(1) == 1) {new Note("down", "normal", 0)}
            else if (currentSong.notes[i][j].charAt(2) == 1) {new Note("up", "normal", 0)}
            else if (currentSong.notes[i][j].charAt(3) == 1) {new Note("right", "normal", 0)}
        }
    }
}

function calcNotes() {
    let amountMeasures = currentSong.notes.length;
    for (let i = 0; i < amountMeasures; i++) { 
        let snap = currentSong.notes[i].length;
        for (let j = 0; j < snap; j++) { 
            let noteMeasure = (i + j / snap);
            let noteTime = noteMeasure * 4 * currentSong.crotchet;
            if (currentSong.songposition - currentSong.crotchet < noteTime) {
                // Calculate y
                // noteTime - song.songposition is the distance from the receptor
                if (downscroll) {
                    y = 400 - (noteTime - currentSong.songposition); 
                } else {
                    y = noteTime - currentSong.songposition;
                }
                // Send to drawNotes function
                drawNotes(currentSong.notes[i][j], y);
            };
        }
    }
}

function drawNotes(notes, y) {
    if (notes.charAt(0) == 1 || notes.charAt(0) == 2) {
        ctx.fillStyle = "purple";
        ctx.fillRect(204, y, 50, 50);
    }
    if (notes.charAt(1) == 1 || notes.charAt(1) == 2) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(264, y, 50, 50);
    }
    if (notes.charAt(2) == 1 || notes.charAt(2) == 2) {
        ctx.fillStyle = "lime";
        ctx.fillRect(324, y, 50, 50);
    }
    if (notes.charAt(3) == 1 || notes.charAt(3) == 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(384, y, 50, 50);
    }
    for (let i = 0; i < 4; i++) {
        if (notes.charAt(i) == 3) {
            ctx.fillStyle = "gray";
            ctx.fillRect(204 + (i * 60), y, 50, 50);
        }
    }
}