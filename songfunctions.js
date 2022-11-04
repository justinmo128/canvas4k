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
        notes[i].distanceFromReceptor = (notes[i].measure * 4 * GHOST.crotchet - GHOST.songposition);
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
        measure: 9,
        notes: "1000",
        // notes2:
        // [1000,
        // 0000,
        // 0100,
        // 0010,]
    },
    {
        measure: 9.5,
        notes: "0100",
    },
    {
        measure: 9.75,
        notes: "0010",
    },
    {
        measure: 10.5,
        notes: "0001",
    },
    {
        measure: 11,
        notes: "0100",
    },
    {
        measure: 11.5,
        notes: "0001",
    },
    {
        measure: 11.5,
        notes: "1000",
    },
    {
        measure: 12.5,
        notes: "0100",
    },
    {
        measure: 13,
        notes: "0010",
    },
    {
        measure: 13.5,
        notes: "0100",
    },
    {
        measure: 13.75,
        notes: "1000",
    },
    {
        measure: 14.5,
        notes: "0001",
    },
    {
        measure: 15,
        notes: "0100",
    },
    {
        measure: 15.5,
        notes: "0010",
    },
    {
        measure: 15.75,
        notes: "1000",
    },
    {
        measure: 16.5,
        notes: "0001",
    },
    {
        measure: 17,
        notes: "0010",
    },
    {
        measure: 18,
        notes: "0001",
    },
    {
        measure: 19.5,
        notes: "1000",
    },
]