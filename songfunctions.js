class Song {
    constructor(bpm, songoffset, songsrc) {
        this.bpm = bpm;
        this.crotchet = 60000 / bpm, // How long a beat is in ms
        this.songoffset = songoffset, // Length of the beginning of the sound file (where metadata is stored) in ms
        this.starttime;
        this.songposition = currentTime - (this.starttime + this.songoffset); // Song position in ms
        this.audio = new Audio(`songs/${songsrc}`);
        this.audio.volume = 0.4;
    }
}

let lastbeat;
const GHOST = new Song(220, 8, "Camellia - GHOST.ogg");

function startSong() {
    lastbeat = 0;
    GHOST.audio.play();
    GHOST.starttime = performance.now();
}

const tickSound = new Audio('snd/tick.mp3'); //temporary
tickSound.volume = 0.4;
function updateSong() {
    GHOST.songposition = (currentTime - (GHOST.starttime + GHOST.songoffset));
    if (GHOST.songposition > lastbeat + GHOST.crotchet) {
        lastbeat = lastbeat + GHOST.crotchet;
        console.log("Beat occurred!");
        tickSound.play(); //temporary
    }
}

function calcNotes() {
    for (let i = 0; i < notes.length; i++) {
        // Calculate y
        notes[i].distanceFromReceptor = (notes[i].measure * GHOST.crotchet - GHOST.songposition);
        notes[i].y = 400 - notes[i].distanceFromReceptor;
        // Make an array
        const splitNotes = Array.from(notes[i].notes, Number);
        // Send to drawNotes function
        drawNotes(notes[i].y, splitNotes);
    }
}

function drawNotes(y, splitNotes) {
    if (y < 480 && y > -50) {
        if (splitNotes[0] === 1) {
            ctx.fillStyle = "purple";
            ctx.fillRect(204, y, 50, 50);
        }
        if (splitNotes[1] === 1) {
            ctx.fillStyle = "cyan";
            ctx.fillRect(264, y, 50, 50);
        }
        if (splitNotes[2] === 1) {
            ctx.fillStyle = "lime";
            ctx.fillRect(324, y, 50, 50);
        }
        if (splitNotes[3] === 1) {
            ctx.fillStyle = "red";
            ctx.fillRect(384, y, 50, 50);
        }
    }
}

// To do: use base 2 number instead of string
let notes = [
    {
        measure: 4,
        notes: "0000",
    },
    {
        measure: 5,
        notes: "0100",
    },
    {
        measure: 6,
        notes: "0110",
    },
    {
        measure: 7,
        notes: "0010",
    },
    {
        measure: 8,
        notes: "0001",
    },
    {
        measure: 9,
        notes: "1001",
    },
    {
        measure: 10,
        notes: "1111",
    },
]