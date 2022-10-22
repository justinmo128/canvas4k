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
const tickSound = new Audio('snd/tick.mp3'); //temporary
tickSound.volume = 0.4;
const GHOST = new Song(220, 8, "Camellia - GHOST.ogg");

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
        tickSound.play(); //temporary
    }
}