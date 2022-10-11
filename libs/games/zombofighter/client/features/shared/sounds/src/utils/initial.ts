const KEY = 'AUDIO_ENABLED'

export const getInitialAudioEnabled = () => {
    return JSON.parse(localStorage.getItem(KEY) || 'true')
}

export const setInitialAudioEnabled = (value: boolean) => {
    localStorage.setItem(KEY, JSON.stringify(value))
}
