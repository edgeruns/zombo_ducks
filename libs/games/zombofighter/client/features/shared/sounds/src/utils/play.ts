import { Sounds } from '../types'
import { getInitialAudioEnabled } from './initial'

const RETRY_MS = 500

const mainAudio = new Audio()

export const playSound = (sound: Sounds, isNewAudio = false) => {
    const enabled = getInitialAudioEnabled()

    if (enabled) {
        const fileName = `${sound}.wav`
        const src = `/assets/sounds/${fileName}`
        const audio = isNewAudio ? new Audio() : mainAudio

        audio.src = src

        const intervalId = setInterval(() => {
            audio
                .play()
                .then(() => clearInterval(intervalId))
                .catch(() => {
                    console.log(`Retry play sound: ${fileName}`)
                })
        }, RETRY_MS)
    }
}

export function pauseSounds() {
    mainAudio.pause()
}
