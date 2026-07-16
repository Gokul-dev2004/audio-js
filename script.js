let musicIcon = document.getElementById("musicIcon");
let speed = document.getElementById("speed");
let songTitle = document.getElementById("songTitle");
let songSlide = document.getElementById("songSlide");
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");
let toggleButton = document.getElementById("toggleButton");
let volumeSlide = document.getElementById("volumeSlide");
let nextSongTitle = document.getElementById("nextSongTitle");


let songs = [
    {title: "I Wanna Be Yours", src:"Songs/Arctic Monkeys - I Wanna Be Yours.mp3"},
    {title: "Die With a Smile", src:"Songs/Die With a Smile (JLAY EDITED).mp3"},
    {title: "Sailor Song", src:"Songs/gigi_perez_sailor_song_official_audio_mp3_60766.mp3"},
    {title: "Kamin", src:"Songs/Kamin.mp3"},
    {title: "Somewhere Only We Know", src:"Songs/Keane - Somewhere Only We Know (Official Music Video).mp3"},
    {title: "Night Changes", src:"Songs/One Direction - Night Changes.mp3"},
    {title: "Back To Friends", src:"Songs/sombr - back to friends.mp3"},
    {title: "Say Yes To Heaven", src:"Songs/spotidownloader.com - Say Yes To Heaven - Lana Del Rey.mp3"},
    {title: " Until I Found You", src:"Songs/Stephen Sanchez - Until I Found You (Official Video).mp3"},
    {title: "One Of The Girls", src:"Songs/The Weeknd - One Of The Girls.mp3"}
];

let player = new Audio();
let currentSong = 0;

function loadPlayer() {
    player.src = songs[currentSong].src;
    songTitle.textContent = songs[currentSong].title;
    nextSongTitle.textContent = "Up Next: " + songs[(currentSong + 1) % songs.length].title;
    player.volume = volumeSlide.value;
    songSlide.value = 0;
    songSlide.max = 0;
};

function playCurrentSong() {
    loadPlayer();
    player.play().then(() => {
        toggleButton.src = "./pause.png";
        musicIcon.style.animation = "icon 2s linear infinite";
    });
}

function togglePlay() {
    if (player.paused) {
        player.play()
        toggleButton.src = "./pause.png";
        musicIcon.style.animation = "icon 2s linear infinite";
    }
    else {
        player.pause();
        toggleButton.src = "./play.png";
        musicIcon.style.animation = "none";
    }
}
function updatePlayer() {
    speed.textContent = player.playbackRate + "X";
    totalTime.textContent = convertTime(player.duration);
    currentTime.textContent = convertTime(player.currentTime);
    songSlide.max = player.duration;
    songSlide.value = player.currentTime;
}

function convertTime(duration) {
    let mins = Math.floor(duration / 60);
    let secs = Math.floor(duration % 60);
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    return mins + ":" + secs;
}

function jumpTo() {
    player.currentTime = songSlide.value;
}

function previousSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    playCurrentSong();
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    playCurrentSong();
}

function descSong() {
    player.playbackRate -= 0.5;
}
function incSong() {
    player.playbackRate += 0.5;
}

function updateVolume() {
    player.volume = volumeSlide.value;
}

setInterval(updatePlayer, 1000);
window.onload = loadPlayer;
player.addEventListener("ended", nextSong);
