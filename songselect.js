let songData = [];
let songs = [];
let songList = ["GHOST", "Bopeebo", "Airborne Robots", "Blue Zenith", "Exit This Earth's Atomosphere"];

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
    determineColour(x);
    ctx.font = "20px Roboto";
    ctx.fillText(`Difficulty:`, 10, 250)
    ctx.font = "30px Roboto";
    ctx.fillText(`${songData[x].charttype} ${songData[x].difficulty}`, 10, 280);
}

function drawRightSide() {
    // Background and current selected song
    ctx.fillStyle = "black";
    ctx.fillRect(cnv.width / 2, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(cnv.width / 2, 192, cnv.width / 2, 96)
    // Lines
    ctx.fillStyle = "white";
    for (let i = 1; i < 5; i++) {
        ctx.fillRect(cnv.width / 2, i * 96 - 1, cnv.width / 2, 2)
    }
    // Text
    let x = mainMenuSelect;
    ctx.font = "25px Roboto";
    for (let i = 0; i < songData.length; i++) {
        if (x + i < songData.length) {
            ctx.fillText(songData[x + i].title, 330, 233 + i * 96);
            ctx.fillText(songData[x + i].artist, 330, 263 + i * 96);
        } else if (x + i == songData.length && x == songData.length - 2) {
            ctx.fillText(songData[0].title, 330, 233 + 2 * 96);
            ctx.fillText(songData[0].artist, 330, 263 + 2 * 96);
        } else if (x + i == songData.length && x == songData.length - 1) {
            ctx.fillText(songData[0].title, 330, 233 + 96);
            ctx.fillText(songData[0].artist, 330, 263 + 96);
            ctx.fillText(songData[1].title, 330, 233 + 2 * 96);
            ctx.fillText(songData[1].artist, 330, 263 + 2 * 96);
        }
    }
    // ctx.fillText(songData[x].title, 330, 233);
    // ctx.fillText(songData[x].artist, 330, 263);
}

function determineColour(x) {
    if (songData[x].charttype === "Challenge") {
        ctx.fillStyle = "purple";
    } else if (songData[x].charttype === "Hard") {
        ctx.fillStyle = "red";
    } else if (songData[x].charttype === "Medium") {
        ctx.fillStyle = "yellow";
    } else if (songData[x].charttype === "Easy") {
        ctx.fillStyle = "lime";
    } else if (songData[x].charttype === "Beginner") {
        ctx.fillStyle = "cyan";
    }
}