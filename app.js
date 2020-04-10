const app = () => {
    const song = document.querySelector('.song') // to gather songs
    const play = document.querySelector('.play') // to get the play button
    const outline = document.querySelector('.moving-outline circle') // to change the path of the circle svg
    const video = document.querySelector('.vid-container video') // to get the videos

    const sounds = document.querySelectorAll('.sound-picker button') // to get the sound picker button
    const timeDisplay = document.querySelector('.time-display') // to get the time display
    const outlineLength = outline.getTotalLength() // to get the length of the circle svg to animate that
    const timeSelect = document.querySelectorAll('.time-select button')
    let fakeDuration = 600; // control the duration, idk

    outline.style.strokeDasharray = outlineLength // Blue things that will fill in the circle
    outline.style.strokeDashoffset = outlineLength // Empty outline waiting to be filled with blue thing above

    // Select the songs
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
          song.src = this.getAttribute("data-sound")
          video.src = this.getAttribute("data-video")
          checkPlaying(song)
        })
    })

    // Click the play button, then it plays or pause
    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    // Select the duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${"0"+Math.floor(fakeDuration % 60)}`
        })
    })

    // if the song is paused, play the song, if wanna pause, click the play button then it will be paused
    const checkPlaying = song => {
        if (song.paused) {
          song.play()
          video.play()
          play.src = "./svg/pause.svg"
        } else {
          song.pause()
          video.pause()
          play.src = "./svg/play.svg"
        }
    }

    // Animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60)

        if (seconds < 10) {
            seconds = "0"+seconds;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`

        if (currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0
            play.src = './svg/play.svg'
            video.pause()
        }
    }
}

app()