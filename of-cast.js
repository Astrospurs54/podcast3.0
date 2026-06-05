// Handle song card play buttons
const songCards = document.querySelectorAll(".song-card");

songCards.forEach(card => {
    const playButton = card.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get song info from the card
            const songTitle = card.querySelector('.song-title').textContent;
            const artistName = card.querySelector('.artist').textContent;
            
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

// Handle contact form
var field = document.querySelector('textarea');
if (field) {
    var backup = field.getAttribute('placeholder');
    var btn = document.querySelector('.btn');
    var clear = document.getElementById('clear');

    field.onfocus = function() {
        this.setAttribute('placeholder', '');
        this.style.borderColor = ' #333 ';
        if (btn) btn.style.display = 'block';
    }

    field.onblur = function() {
        this.setAttribute('placeholder', backup);
        this.style.borderColor = ' #aaa ';
    }

    if (clear) {
        clear.onclick = function() {
            if (btn) btn.style.display = 'none';
            field.value = '';
        }
    }
}



// Handle contact form
var field = document.querySelector('textarea');
if (field) {
    var backup = field.getAttribute('placeholder');
    var btn = document.querySelector('.btn');
    var clear = document.getElementById('clear');

    field.onfocus = function() {
        this.setAttribute('placeholder', '');
        this.style.borderColor = ' #333 ';
        if (btn) btn.style.display = 'block';
    }

    field.onblur = function() {
        this.setAttribute('placeholder', backup);
        this.style.borderColor = ' #aaa ';
    }

    if (clear) {
        clear.onclick = function() {
            if (btn) btn.style.display = 'none';
            field.value = '';
        }
    }
}
