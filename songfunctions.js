class Song {
    constructor(bpm, offset, songsrc) {
        this.bpm = bpm;
        this.crotchet = 60000 / bpm, // How long a beat is in ms
        this.songoffset = offset, // Length of the beginning of the sound file (where metadata is stored) in ms
        this.starttime;
        this.songposition = currentTime - (this.starttime + this.songoffset); // Song position in ms
        this.audio = new Audio(`songs/${songsrc}`);
        this.audio.volume = 0.4;
    }
}

// Global variables
let lastbeat;
let song;
let notes;
const tickSound = new Audio('snd/tick.mp3');
tickSound.volume = 0.4;

// JSON parser thing
const xmlhttp = new XMLHttpRequest();
const GHOSTUrl = "songs/GHOST.json";
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    song = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", GHOSTUrl, false);
xmlhttp.send();

// Make a new song object
const GHOST = new Song(song.bpm, song.offset, song.music);

function startSong() {
    lastbeat = 0;
    GHOST.audio.play();
    GHOST.starttime = performance.now();
}

function updateSong() {
    GHOST.songposition = (currentTime - (GHOST.starttime + GHOST.songoffset));
    if (GHOST.songposition > lastbeat + GHOST.crotchet) {
        lastbeat = lastbeat + GHOST.crotchet;
        console.log("Beat occurred!");
        tickSound.play();
    }
}

function calcNotes() {
    // song.notes.length is the amount of measures
    for (let i = 0; i < song.notes.length; i++) { 
        // song.notes[i].length is the snap of the measure (eg. 4 is 4th snap)
        for (let j = 0; j < song.notes[i].length; j++) { 
            let noteMeasure = (i + j / song.notes[i].length);
            let noteTime = noteMeasure * 4 * GHOST.crotchet;
            if (GHOST.songposition - GHOST.crotchet < noteTime) {
                // Calculate y
                // noteTime - GHOST.songposition is the distance from the receptor
                y = 400 - (noteTime - GHOST.songposition); 
                // Send to drawNotes function
                drawNotes(song.notes[i][j], y);
            };
        }
    }
}

function drawNotes(notes, y) {
    if (notes.charAt(0) == 1) {
        ctx.fillStyle = "purple";
        ctx.fillRect(204, y, 50, 50);
    }
    if (notes.charAt(1) == 1) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(264, y, 50, 50);
    }
    if (notes.charAt(2) == 1) {
        ctx.fillStyle = "lime";
        ctx.fillRect(324, y, 50, 50);
    }
    if (notes.charAt(3) == 1) {
        ctx.fillStyle = "red";
        ctx.fillRect(384, y, 50, 50);
    }
}