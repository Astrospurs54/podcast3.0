const resultTemplate = document.querySelector("[data-result-template]")
const resultCardContainer = document.querySelector("[data-result-card-container]")
const searchInput = document.querySelector("[data-search]")



let results = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase()

    if (!value) {
        results.forEach(result => {
            result.element.style.display = "none"
        })
        return
    }

    results.forEach(result => {
        const isVisible = result.artist.toLowerCase().includes(value) || result.song.toLowerCase().includes(value)
        result.element.style.display = isVisible ? "block" : "none"
    })

    // Check if any results are visible and show/hide the container accordingly
    const hasVisibleResults = results.some(result => result.element.style.display === "block")
    resultCardContainer.style.display = hasVisibleResults ? "block" : "none"

})
 

    




fetch("search-data.json")
    .then(res => res.json())
    .then(data => {
        results = data.map(result => {
            const resultElement = resultTemplate.content.cloneNode(true).children[0]
            const artistContainer = resultElement.querySelector("[data-result-artist]")
            const songContainer = resultElement.querySelector("[data-result-song]")

            const artistLink = document.createElement("a")
            artistLink.textContent = result["result-artist"]
            if (result["artist-url"]) {
                artistLink.href = result["artist-url"]
               
            }
            artistContainer.append(artistLink)

            const songLink = document.createElement("a")
            songLink.textContent = result["result-song"]
            if (result["song-url"]) {
                songLink.href = result["song-url"]
                songLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(result["song-url"]);
                    if (target) {
                        target.scrollIntoView({block: 'center'});
                        target.classList.add('highlight');
                        setTimeout(() => target.classList.remove('highlight'), 3000);
                    }
                });
            }
            songContainer.append(songLink)

            resultElement.style.display = "none"
            resultCardContainer.append(resultElement)
            return {
                artist: result["result-artist"],
                song: result["result-song"],
                element: resultElement
            }
        })
        // Initially hide the container since no search has been performed
        resultCardContainer.style.display = "none"
    })


// drop down menu

  const toggleBtn =document.querySelector(".toggle-Btn")
    const dropdown =document.querySelector(".dropdown-menu")
    

    toggleBtn.onclick = function (){ 
        dropdown.classList.toggle("open")
        const isOpen = dropdown.classList.contains("open")
    }


// song plays next when song ends in featured section

