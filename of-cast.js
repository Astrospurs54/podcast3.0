// Handle song card play buttons
const songCards = document.querySelectorAll(".song-card");
let currentlyPlayingCard = null;

songCards.forEach(card => {
    const playButton = card.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get song info from the card
            const songTitle = card.querySelector('.song-title').textContent;
            const artistName = card.querySelector('.artist').textContent;
            const PlayIcon = card.querySelector('.play-Icon');

            //reset previous card to play icon
             
            
            if (currentlyPlayingCard && currentlyPlayingCard !== card) {
               resetCardToPlayIcon(currentlyPlayingCard);
            }
            //set this card to pause  icon
            if (PlayIcon) {
                PlayIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
            currentlyPlayingCard = card;

          

            // Play the song using the global music player function
            if (typeof playSongByName === 'function') {
                playSongByName(songTitle, artistName);
                
                // Scroll to music player
                const musicPlayer = document.querySelector(".music-player");
                if (musicPlayer) {
                    musicPlayer.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        });
    }
});

  // helper function to reset a card icon
  function resetCardToPlayIcon(card) {
    const PlayIcon = card.querySelector('.play-Icon');
    if (PlayIcon) {
        PlayIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}