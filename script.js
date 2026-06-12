const resultTemplate = document.querySelector("[data-result-template]");
const resultCardContainer = document.querySelector("[data-result-card-container]");
const searchInput = document.querySelector("[data-search]");

let results = [];
let allSongs = [];

// Fetch songs data for searching
fetch("search-data.json")
    .then(res => res.json())
    .then(data => {
        allSongs = data;
        initializeSearchResults();
    })
    .catch(error => console.error("Error loading songs:", error));

// Initialize search results
function initializeSearchResults() {
    results = allSongs.map(result => {
        const resultElement = resultTemplate.content.cloneNode(true).children[0];
        const artistContainer = resultElement.querySelector("[data-result-artist]");
        const songContainer = resultElement.querySelector("[data-result-song]");

        // Artist link
        const artistLink = document.createElement("a");
        artistLink.textContent = result["result-artist"];
        if (result["artist-url"]) {
            artistLink.href = result["artist-url"];
        }
        artistContainer.append(artistLink);

        // Song link - now plays the song
        const songLink = document.createElement("a");
        songLink.textContent = result["result-song"];
        songLink.href = "#";
        songLink.style.cursor = "pointer";
        
        // When song is clicked in search results, play it
        songLink.addEventListener("click", (e) => {
            e.preventDefault();
            playSongById(result.id);
            // Scroll to music player
            const musicPlayer = document.querySelector(".music-player");
            if (musicPlayer) {
                musicPlayer.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });

        songContainer.append(songLink);
        resultElement.style.display = "none";
        resultCardContainer.append(resultElement);
        
        return {
            artist: result["result-artist"],
            song: result["result-song"],
            element: resultElement,
            id: result.id
        };
    });

    // Initially hide the container since no search has been performed
    resultCardContainer.style.display = "none";
}

// Search functionality
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (!value) {
        results.forEach(result => {
            result.element.style.display = "none";
        });
        resultCardContainer.style.display = "none";
        return;
    }

    let hasVisibleResults = false;
    results.forEach(result => {
        const isVisible = 
            result.artist.toLowerCase().includes(value) || 
            result.song.toLowerCase().includes(value);
        result.element.style.display = isVisible ? "block" : "none";
        if (isVisible) hasVisibleResults = true;
    });

    resultCardContainer.style.display = hasVisibleResults ? "block" : "none";
});

