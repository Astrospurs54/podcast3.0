// this js file is for Global music player 
let songs = [];
let currentSongIndex = 0;
let audio = null;

// DOM Elements
const songImage = document.getElementById("player-img");
const songTitle = document.getElementById("song-title");
const Artist = document.getElementById("artist");
const songSlider = document.getElementById("progress-bar");
const playbtn = document.getElementById("play-button");
const playIcon = document.getElementById("play-Icon");
const forwardBtn = document.getElementById("forward-btn");
const rewindBtn = document.getElementById("backward-btn");
const currentTimeDisplay = document.querySelector(".current-time");
const durationDisplay = document.querySelector(".duration");
const musicPlayer = document.querySelector(".music-player");
const playbtnSec3 = document.getElementById("play-button-sec3");
const playIconSec3 = document.getElementById("play-Icon-sec3");
  //calling constants of sec3


// Initialize audio element
audio = document.createElement("audio");

// Fetch songs from JSON and initialize
fetch("search-data.json")
    .then(res => res.json())
    .then(data => {
        songs = data;
        if (songs.length > 0) {
            updateSong();
        }
    })
    .catch(error => console.error("Error loading songs:", error));

// Function to format time (MM:SS)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update player display with current song
function updateSong() {
    if (songs.length === 0) return;
    
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songTitle.innerText = song["result-song"];
    Artist.innerText = song["result-artist"];
    audio.src = song.audio;

    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
        durationDisplay.innerText = formatTime(audio.duration);
    };
}

// Play/Pause button
playbtn.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicPlayer.classList.add("active");
    } else {
        audio.pause();
        playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';

        //reset card icon
        if(currentlyPlayingCard)
        {
            resetCardToPlayIcon(currentlyPlayingCard);
        }
    }
});

function loadPlayerSongFromSec3Card(card) {
    const cardAudio = card.querySelector('.song-audio-sec3');
    if (!cardAudio) return false;

    const titleText = card.querySelector('.song-title')?.textContent.trim() || '';
    const artistText = card.querySelector('.artist')?.textContent.trim() || '';
    const artworkSrc = card.querySelector('img.artwork-sec3')?.src || card.querySelector('.artwork-container-sec3 img')?.src;

    audio.src = cardAudio.src;
    if (titleText) songTitle.innerText = titleText;
    Artist.innerText = artistText || '';
    if (artworkSrc) songImage.src = artworkSrc;

    const jsonIndex = songs.findIndex(song => song.audio === audio.src);
    if (jsonIndex !== -1) {
        currentSongIndex = jsonIndex;
    }

    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
        durationDisplay.innerText = formatTime(audio.duration);
    };

    return true;
}

const sec3PlayButtons = document.querySelectorAll('.play-button-sec3');
sec3PlayButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = button.closest('.song-card-sec3');
        if (!card) return;

        if (loadPlayerSongFromSec3Card(card)) {
            audio.play().then(() => {

            playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
            musicPlayer.classList.add("active");
        }).catch(err => {
            console.error("playBack failed:", err);
        });
        }
    });
});



//

// Rewind button'@; if ($text -notlike "*$old*") { throw 'Old block not found' }; Set-Content $path ($text.Replace($old,$new)); Write-Host 'Updated music-player.js'

// Rewind button
rewindBtn.addEventListener("click", function() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        updateSong();
        audio.play();
        playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicPlayer.classList.add("active");

        //reset old 
        if(currentlyPlayingCard)   resetCardToPlayIcon(currentlyPlayingCard);
        // highlight the new card if it exists
        updateActiveCardHighlight();
    }
});

// Forward button
forwardBtn.addEventListener("click", function() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        updateSong();
          //reset old 
        if(currentlyPlayingCard)   resetCardToPlayIcon(currentlyPlayingCard);
        // highlight the new card if it exists
        updateActiveCardHighlight();
        audio.play();
        playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicPlayer.classList.add("active");
    }
});

function updateActiveCardHighlight() {
    //reset all cards first
    document.querySelectorAll('.song-card').forEach(card => {
        resetCardToPlayIcon(card);
    });
    //find the card matching current song and highlight it
    const currentTitle = songs[currentSongIndex]["result-song"];
    const currentArtist = songs[currentSongIndex]["result-artist"];

    const matchingCard = Array.from(document.querySelectorAll('.song-card')).find(card => {
        const cardTitle = card.querySelector('.song-title')?.textContent.trim() || '';
        const cardArtist = card.querySelector('.artist')?.textContent.trim() || '';
        return cardTitle === currentTitle && cardArtist === currentArtist;
    });

    if (matchingCard) {
        const PlayIcon = matchingCard.querySelector('.play-Icon');
        if (PlayIcon) PlayIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        currentlyPlayingCard = matchingCard;
    }
}

// Progress slider
songSlider.addEventListener("input", function() {
    audio.currentTime = songSlider.value;
});

// Update slider as song plays
function moveSlider() {
    if (!isNaN(audio.duration)) {
        songSlider.value = audio.currentTime;
        currentTimeDisplay.innerText = formatTime(audio.currentTime);
    }
}

setInterval(moveSlider, 1000);

// Auto-play next song when current finishes
audio.addEventListener("ended", function() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        updateSong();
        audio.play();
        playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicPlayer.classList.add("active");
    } else {
        // Playlist finished
        playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';

    }
});

// Global function to play a specific song by ID
function playSongById(songId) {
    const index = songs.findIndex(song => song.id === songId);
    if (index !== -1) {
        currentSongIndex = index;
        updateSong();
        audio.play();
        playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicPlayer.classList.add("active");
    }
}

// Global function to play a song by title and artist
function playSongByName(title, artist) {
    const index = songs.findIndex(song => 
        song["result-song"].toLowerCase() === title.toLowerCase() &&
        song["result-artist"].toLowerCase() === artist.toLowerCase()
    );
    if (index !== -1) {
        currentSongIndex = index;
        updateSong();
        audio.play();
        playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicPlayer.classList.add("active");
    }
}

//================================================================LOOP FUNCTIONALITY=================================================

let isLooping = false;
let currentEndedHandler = null; // Store the current 'ended' event handler  
const loopBtn = document.getElementById('repeat-btn');

//toogle loop

if (loopBtn){
    loopBtn.addEventListener("click", () => {
        isLooping = !isLooping;

        if (isLooping) {  
            loopBtn.classList.add("active");
            loopBtn.style.color = "#1db954";}
        else {
            loopBtn.classList.remove("active");
            loopBtn.style.color = "";
        } 
        updateEndedListener();      
    });
}



function updateEndedListener() {
    if (currentEndedHandler) {
        audio.removeEventListener("ended", currentEndedHandler);
    }
    //create new handler
    currentEndedHandler = () => {
        if (isLooping) {
            audio.currentTime = 0;
            audio.play().catch(err => console.error("Error looping audio:", err));
        } else {
            if(typeof playNextSong === "function") {
                playNextSong();
            }
        }   
    };


audio.addEventListener("ended", currentEndedHandler);   

}

updateEndedListener();