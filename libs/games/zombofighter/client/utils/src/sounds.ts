const WAIT_MS = 500
const KEY = 'isAudioDisabled'
const mainAudio = new Audio()

export enum Sounds {
    Button = 'button',
    Timer = 'timer',
    Laugh = 'laugh',
    Hit = 'hit',
    Start = 'start',
    StartSearching = 'start-searching',
    Searching = 'searching',
    GameStart = 'game-start',
    GameSession = 'game-session',
    RoundStart = 'round-start',
    RoundVictory = 'round-victory',
    RoundLose = 'round-lose',
    GameFinishVictory = 'game-finish-victory',
    GameFinishLose = 'game-finish-lose',
}

export const isAudioDisabled = () => {
    const item = JSON.parse(localStorage.getItem(KEY) || 'false')

    return item === true
}

export const toggleAudio = () => {
    if (isAudioDisabled()) {
        localStorage.setItem(KEY, 'false')

        return false
    } else {
        localStorage.setItem(KEY, 'true')

        mainAudio.pause()

        return true
    }
}

export const playSound = (sound: Sounds, newAudio = false) => {
    if (!isAudioDisabled()) {
        const fileName = `${sound}.wav`
        const src = `/assets/sounds/${fileName}`
        const audio = newAudio ? new Audio() : mainAudio

        audio.src = src

        const intervalId = setInterval(() => {
            audio
                .play()
                .then(() => clearInterval(intervalId))
                .catch(() => {
                    console.log(`Retry play sound: ${fileName}`)
                })
        }, WAIT_MS)
    }
}
