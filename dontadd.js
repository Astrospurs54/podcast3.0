

    //calling constants of sec3
const myaudio = document.getElementById("song-audio-sec3")
const playIconsec3 =document.getElementById("play-Icon-sec3")
const playBtnsec3 = document.getElementById("play-button-sec3")


let isplay = false;

        // Play/Pause handler

      playBtnsec3.addEventListener("click", () => {
          
         if (isplay) {
                myaudio.pause();
                playIconsec3.innerHTML = '<i class="fa-solid fa-play"></i>';
       
                
            } else {
                myaudio.play();
                playIconsec3.innerHTML = '<i class="fa-solid fa-pause"></i>';
       
            }

            isplay = !isplay;

      });


      const songCardssec3 = document.querySelectorAll(".song-card-sec3");
    let currentAudiosec3 = null;   // Keeps track of the currently playing audio

    songCardssec3.forEach(card => {
        const myaudio = card.querySelector('.song-audio-sec3');
        const playButtonsec3 = card.querySelector('.play-button-sec3');
        const progressContainersec3 = card.querySelector('.progress-container-sec3');
        const progressBarsec3 = card.querySelector('.progress-bar-sec3');
        const currentTimesec3 = card.querySelector('.current-time-sec3');
        const durationsec3 = card.querySelector('.duration-sec3');



        
        // Update progress bar
        myaudio.addEventListener('timeupdate', () => {
            if (myaudio.duration) {
                const percent = (myaudio.currentTime / myaudio.duration) * 100;
                progressBarsec3.style.width = percent + '%';
                currentTimesec3.textContent = formatTime(myaudio.currentTime);
            }
        });

         // Seek when clicking progress bar
        progressContainersec3.addEventListener('click', (e) => {
            const rect = progressContainersec3.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = clickX / rect.width;
            myaudio.currentTime = percent * myaudio.duration;
        });

        
        // Helper function: seconds → MM:SS
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `\( {min}: \){sec.toString().padStart(2, '0')}`;
    }


    // Reset when song ends and play the next sec3 song
        myaudio.addEventListener('ended', () => {
            progressBarsec3.style.width = '0%';
            currentTimesec3.textContent = '0:00';
            playButtonsec3.innerHTML = '<div class="play-Icon-sec3" id="play-Icon-sec3"><i class="fa-solid fa-play"></i></div>';
            currentAudiosec3 = null;

            const sec3Cards = Array.from(document.querySelectorAll('.song-card-sec3'));
            const currentIndex = sec3Cards.findIndex(card => card.contains(myaudio));
            if (currentIndex === -1) return;

            const nextCard = sec3Cards[(currentIndex + 1) % sec3Cards.length];
            const nextAudio = nextCard.querySelector('.song-audio-sec3');
            if (!nextAudio) return;

            document.querySelectorAll('.song-audio-sec3').forEach(a => {
                if (a !== nextAudio) a.pause();
            });

            songCardssec3.forEach(card => {
                const btn = card.querySelector('.play-button-sec3');
                if (btn) btn.innerHTML = '<div class="play-Icon-sec3" id="play-Icon-sec3"><i class="fa-solid fa-play"></i></div>';
            });

            nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nextCard.classList.add('highlight');
            setTimeout(() => nextCard.classList.remove('highlight'), 3000);

            nextAudio.currentTime = 0;
            nextAudio.play().catch(() => {});
            currentAudiosec3 = nextAudio;

            const nextButton = nextCard.querySelector('.play-button-sec3');
            if (nextButton) {
                nextButton.innerHTML = '<div class="play-Icon-sec3" id="play-Icon-sec3"><i class="fa-solid fa-pause"></i></div>';
            }
        });
// update time and progress

myaudio.addEventListener("timeupdate", () => {

  progressBarsec3.value =(myaudio.currentTimesec3 / myaudio.duration) *100;

  let currentMinutes = Math.floor(myaudio.currentTime / 60);
  let currentSeconds = Math.floor(myaudio.currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }

  currentTimesec3.textContent = currentMinutes + ":" + currentSeconds;

  let durationMinutes = Math.floor(myaudio.duration / 60);
  let durationSeconds = Math.floor(myaudio.duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }

  durationsec3.textContent = durationMinutes + ":" + durationSeconds;
});
    
        // Play/Pause handler
        playButtonsec3.addEventListener('click', () => {
            // If another song is playing, pause it first
            if (currentAudiosec3 && currentAudiosec3 !== myaudio) {
                currentAudiosec3.pause();
             // Reset when playing another song
             
                // Reset previous play button
                document.querySelectorAll('.play-button-sec3').forEach(btn => {
                    if (btn !== playButtonsec3) btn.innerHTML = ' <div class="play-Icon-sec3" id="play-Icon-sec3"><i class="fa-solid fa-play"></i></div>';
                });

            }
            if (currentAudio && currentAudio !== audio ) {
                currentAudio.pause();
            
                 // Reset previous play button
                document.querySelectorAll('.play-button').forEach(btn => {
                    if (btn !== playButtonsec3) btn.innerHTML = ' <div class="play-Icon" id="play-Icon"><i class="fa-solid fa-play"></i></div>';
                });
            }

            if (myaudio.paused) {
                myaudio.play();
                playButtonsec3.innerHTML = '<div class="play-Icon-sec3" id="play-Icon-sec3"><i class="fa-solid fa-pause"></i></div>'; // Pause icon
                currentAudiosec3 = myaudio;
            } else {
                myaudio.pause();
                playButtonsec3.innerHTML = ' <div class="play-Icon-sec3" id="play-Icon-sec3"><i class="fa-solid fa-play"></i></div>';
            }
        });
    });
 


      



