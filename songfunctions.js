class conductor {
    constructor(bpm, songoffset) {
        this.bpm = bpm;
        this.crotchet = 60000 / this.bpm, // How long a beat is in ms
        this.songoffset = songoffset,
        this.starttime = perfomance.now();
        this.songposition = currentTime - (this.starttime + this.songoffset); // Song position in ms
    }
}

let lastbeat;
let tickSound = new Audio('snd/tick.mp3'); //temporary
let crotchet = 60000 / 120;
let songposition;

function startSong() {
    lastbeat = 0;
}

function updateSong() {
    // if (song.songposition > lastbeat + song.crotchet) {
    //     lastbeat += crotchet;
    //     tickSound.play(); //temporary
    // }
    songposition = currentTime;
    if (songposition > lastbeat + crotchet) {
        lastbeat += crotchet;
        tickSound.play(); //temporary
    }
}