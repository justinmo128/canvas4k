let songData;
function loadSongs() {
    gameState = "loading";
    let Url = "songs/GHOST/GHOST.json";
    // JSON parser thing
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            songData = JSON.parse(this.responseText);

        }
    };
    xmlhttp.open("GET", Url, false); // Async is literally asynchronous (makes the notes desync from the song)
    xmlhttp.send();
    gameState = "songselect"
}

function drawLoadingScreen() {
    drawMainComponents();
    ctx.fillStyle = "white";
    ctx.font = "22px Roboto";
    ctx.fillText("Loading Songs...", 330, 440);
}

function drawSongSelectMenu() {
    drawMainComponents();
    ctx.fillStyle = "white";
    ctx.font = "22px Roboto";
    ctx.fillText("Press Enter", 330, 440);
}