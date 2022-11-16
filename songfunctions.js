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
        gameState = "start";
        this.audio.load();
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
            y = 400 - (noteTime - song.songposition); 
        } else {
            y = noteTime - song.songposition;
        }
    }
}

class Hold {
    constructor() {
        // WIP
    }
}

// Song Variables
let song;
let lastbeat;
const tickSound = new Audio('snd/tick.mp3');
tickSound.volume = 0.4;

function startSong() {
    // Make a new song object
    song = new Song(songData.title, songData.music, songData.offset, songData.bpm, songData.notes);

    lastbeat = 0;
    song.audio.play();
    song.starttime = performance.now();
}

function createNotes() {
    // song.notes.length is the amount of measures
    for (let i = 0; i < song.notes.length; i++) {
        // song.notes[i].length is the snap of the measure (eg. 4 is 4th snap)
        for (let j = 0; j < song.notes[i].length; j++) { 
            if (song.notes[i][j].charAt(0) == 1) {new Note("left", "normal", 0)}
            else if (song.notes[i][j].charAt(1) == 1) {new Note("down", "normal", 0)}
            else if (song.notes[i][j].charAt(2) == 1) {new Note("up", "normal", 0)}
            else if (song.notes[i][j].charAt(3) == 1) {new Note("right", "normal", 0)}
        }
    }
}

function calcNotes() {
    // song.notes.length is the amount of measures
    for (let i = 0; i < song.notes.length; i++) { 
        // song.notes[i].length is the snap of the measure (eg. 4 is 4th snap)
        for (let j = 0; j < song.notes[i].length; j++) { 
            let noteMeasure = (i + j / song.notes[i].length);
            let noteTime = noteMeasure * 4 * song.crotchet;
            if (song.songposition - song.crotchet < noteTime) {
                // Calculate y
                // noteTime - song.songposition is the distance from the receptor
                if (downscroll) {
                    y = 400 - (noteTime - song.songposition); 
                } else {
                    y = noteTime - song.songposition;
                }
                // Send to drawNotes function
                drawNotes(song.notes[i][j], y);
            };
        }
    }
}

function drawNotes(notes, y) {
    if (notes.charAt(0) == 1 || notes.charAt(0) == 2 || notes.charAt(0) == 3) {
        ctx.fillStyle = "purple";
        ctx.fillRect(204, y, 50, 50);
    }
    if (notes.charAt(1) == 1 || notes.charAt(1) == 2 || notes.charAt(1) == 3) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(264, y, 50, 50);
    }
    if (notes.charAt(2) == 1 || notes.charAt(2) == 2 || notes.charAt(2) == 3) {
        ctx.fillStyle = "lime";
        ctx.fillRect(324, y, 50, 50);
    }
    if (notes.charAt(3) == 1 || notes.charAt(3) == 2 || notes.charAt(3) == 3) {
        ctx.fillStyle = "red";
        ctx.fillRect(384, y, 50, 50);
    }
}