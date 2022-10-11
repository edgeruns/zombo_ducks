import { useGameSounds } from './useGameSounds'
import { usePause } from './usePause'

export function useSounds() {
    useGameSounds()
    usePause()
}
