

/**
 * Playes the music
 * @param song the path to the song
 * @returns 
 */
export function play_music(song: HTMLAudioElement) {
    song.currentTime = 0;
    song.loop = true;
    song.volume = 1;
    song.muted = true;
    song.play();

    song.play().then(() => {
        setTimeout(() => {
            song.muted = false; // Unmute after a short delay
        }, 1); // Unmutes after 1 second
    }).catch((error) => {
        console.log("Autoplay blocked, waiting for user interaction:", error);
    });
    return true;
}

/**
 * Stops the music
 * @param song 
 * @returns 
 */
export function stop_music(song: HTMLAudioElement): boolean {

    song.pause();
    song.currentTime = 0;
    return true;
}


