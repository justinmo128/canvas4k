let songData = [];
let songs = [];
let songList = ["GHOST", "Bopeebo", "Airborne Robots", "Blue Zenith", "Exit This Earth's Atomosphere", "Light It Up"];

function loadSongs() { // Called in keyhandlers.js
    gameState = "loading";
    for (let i = 0; i < songList.length; i++) {
        fetch(`songs/${songList[i]}/${songList[i]}.json`)
            .then((res) => res.json())
            .then((data) => {
                songData[i] = data;
                songs[i] = new Song(songData[i].title, songData[i].music, songData[i].offset, songData[i].bpm, songData[i].notes);
                if (i == songList.length - 1) {
                    gameState = "songselect";
                }
            });
    }
}

function drawLoadingScreen() {
    drawMainComponents();
    ctx.fillStyle = "#007F96";
    ctx.fillRect(0, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font = "20px Roboto";
    ctx.fillText("Song Select", 10, 30);
    ctx.font = "40px Roboto";
    ctx.fillText("Loading Songs...", 10, 120);
}

function drawSongSelectMenu() {
    songs[mainMenuSelect].audio.play();
    drawMainComponents();
    drawLeftSide();
    drawRightSide();
}

function drawLeftSide() {
    let x = mainMenuSelect;
    // Background and Song Select Text
    ctx.fillStyle = "#007F96";
    ctx.fillRect(0, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font = "20px Roboto";
    ctx.fillText("Song Select", 10, 30);
    // Song info and "press enter to begin"
    ctx.font = "50px Roboto";
    ctx.fillText(songData[x].title, 10, 120);
    ctx.font = "25px Roboto";
    ctx.fillText(songData[x].artist, 10, 147);
    ctx.fillText("Press Enter to begin.", 10, 400);
    ctx.font = "15px Roboto";
    ctx.fillText(`Charted by: ${songData[x].charter}`, 10, 470);
    ctx.fillText(`${songData[x].bpm} BPM`, 10, 170);
    ctx.fillText(`Length: ${Math.floor(songs[x].audio.duration / 60)}:${Math.round(songs[x].audio.duration % 60)}`, 10, 190);
    // Difficulty
    ctx.font = "20px Roboto";
    ctx.fillText(`Difficulty:`, 10, 250)
    ctx.font = "30px Roboto";
    ctx.fillText(`${determineDifficulty(songData[x].difficulty)} ${songData[x].difficulty}`, 10, 280);
}

function drawRightSide() {
    // Background and current selected song
    ctx.fillStyle = "black";
    ctx.fillRect(cnv.width / 2, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(cnv.width / 2, 0, cnv.width / 2, 96);
    // Lines
    ctx.fillStyle = "white";
    for (let i = 1; i < 5; i++) {
        ctx.fillRect(cnv.width / 2, i * 96 - 1, cnv.width / 2, 2);
    }
    // Text
    let slots = [
        {title: "title", artist: "artist", y: 233}, // Center (3rd slot)
        {title: "title", artist: "artist", y: 329},
        {title: "title", artist: "artist", y: 425}, // Bottom (5th slot)
        {title: "title", artist: "artist", y: 41}, // Top (1st slot)
        {title: "title", artist: "artist", y: 137},
    ];
    let x = mainMenuSelect;
    for (let i = 0; i < 3; i++) {
        slots[i].title = songData[(x + i) % songData.length].title;
        slots[i].artist = songData[(x + i) % songData.length].artist;
    }
    ctx.font = "25px Roboto";
    for (let i = 0; i < slots.length; i++) {
        ctx.fillText(slots[i].title, 330, slots[i].y);
        ctx.fillText(slots[i].artist, 330, slots[i].y + 30);
    }
}

function determineDifficulty(x) {
    // Easy: 1-6, Normal: 7-9, Hard: 10-13, Insane: 13-18, Challenge: 18+
    if (x >= 18) {
        ctx.fillStyle = "cyan";
        return "Challenge";
    } else if (x >= 14 && x < 18) {
        ctx.fillStyle = "purple";
        return "Insane";
    } else if (x >= 10 && x < 14) {
        ctx.fillStyle = "red";
        return "Hard";
    } else if (x >= 7 && x < 10) {
        ctx.fillStyle = "yellow";
        return "Medium";
    } else {
        ctx.fillStyle = "lime";
        return "Easy";
    }
}