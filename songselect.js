let songData;
let songList = ["GHOST", "Bopeebo"];

function loadSongs(i) {
    gameState = "loading";
    fetch(`songs/${songList[i]}/${songList[i]}.json`)
        .then((res) => res.json())
        .then((data) => {
            songData = data;
            song = new Song(songData.title, songData.music, songData.offset, songData.bpm, songData.notes);
            song.audio.play();
            gameState = "songselect"
        });
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
    ctx.fillText("Loading Song...", 10, 120);
}

function drawSongSelectMenu() {
    drawMainComponents();
    drawLeftSide();
    drawRightSide();
}

function drawLeftSide() {
    ctx.fillStyle = "#007F96";
    ctx.fillRect(0, 0, cnv.width / 2, cnv.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font = "20px Roboto";
    ctx.fillText("Song Select", 10, 30);
    ctx.font = "50px Roboto";
    ctx.fillText(songData.title, 10, 120);
    ctx.font = "25px Roboto";
    ctx.fillText(songData.artist, 10, 147);
    ctx.fillText("Press Enter to begin.", 10, 400);
    ctx.font = "15px Roboto";
    ctx.fillText(`Charted by: ${songData.charter}`, 10, 470);
    ctx.fillText(`${songData.bpm} BPM`, 10, 170);
    ctx.fillText(`Length: ${Math.floor(song.audio.duration / 60)}:${Math.round(song.audio.duration % 60)}`, 10, 190);
    if (songData.charttype === "Challenge") {
        ctx.fillStyle = "purple";
    } else if (songData.charttype === "Hard") {
        ctx.fillStyle = "red";
    } else if (songData.charttype === "Medium") {
        ctx.fillStyle = "yellow";
    } else if (songData.charttype === "Easy") {
        ctx.fillStyle = "cyan";
    } else if (songData.charttype === "Beginner") {
        ctx.fillStyle = "lime";
    } else if (songData.charttype === "Edit") {
        ctx.fillStyle = "black";
    }
    ctx.font = "20px Roboto";
    ctx.fillText(`Difficulty:`, 10, 250)
    ctx.font = "30px Roboto";
    ctx.fillText(`${songData.charttype} ${songData.difficulty}`, 10, 280);
}

function drawRightSide() {
    
}