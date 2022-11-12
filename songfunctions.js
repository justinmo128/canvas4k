// Global variables
let lastbeat;
let songData;
let notes;
let song;
const tickSound = new Audio('snd/tick.mp3');
tickSound.volume = 0.4;

class Song {
    constructor(bpm, offset, songsrc, notes) {
        this.bpm = bpm;
        this.crotchet = 60000 / bpm, // How long a beat is in ms
        this.songoffset = offset, // Length of the beginning of the sound file (where metadata is stored) in ms
        this.starttime;
        this.songposition = currentTime - (this.starttime + this.songoffset); // Song position in ms
        this.audio = new Audio(`songs/${songsrc}`);
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
        if (song.songposition > song.notes.length * song.crotchet * 4) {
            this.endSong();
        }
    }
    endSong() {
        gameState = "start";
        this.audio.load();
    }
}

class Note {
    constructor() {
        //WIP
    }
}

function startSong() {
    let Url = "songs/GHOST.json";

    // JSON parser thing
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        songData = JSON.parse(this.responseText);
    }
    };
    xmlhttp.open("GET", Url, false); // It is possible to replace GHOSTUrl with something else
    xmlhttp.send();

    // Make a new song object
    song = new Song(songData.bpm, songData.offset, songData.music, songData.notes);

    lastbeat = 0;
    song.audio.play();
    song.starttime = performance.now();
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
                y = 400 - (noteTime - song.songposition); 
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