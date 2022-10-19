import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Sounds } from '../types'
import * as selectors from '../data/selectors'
import { playSound } from '../utils'

export function useGameSounds() {
    const isEnabled = useSelector(selectors.isEnabled)

    const location = useLocation()

    const isPlayStartSound = location.pathname === '/'
    const isPlaySearchSound = location.pathname === '/game/search'
    const isPlayGameStartSound = false
    const isPlayRoundStartSound = false
    const isPlayTimerSound = false
    const isPlayRoundVictorySound = false
    const isPlayRoundLoseSound = false
    const isPlayGameVictorySound = false
    const isPlayGameLoseSound = false

    useEffect(() => {
        if (isPlayStartSound) {
            playSound(Sounds.Start)
        }
    }, [isPlayStartSound, isEnabled])

    useEffect(() => {
        if (isPlaySearchSound) {
            playSound(Sounds.Searching)
        }
    }, [isPlaySearchSound, isEnabled])

    useEffect(() => {
        if (isPlayGameStartSound) {
            playSound(Sounds.GameStart)
            setTimeout(playSound, 2000, Sounds.GameSession)
        }
    }, [isPlayGameStartSound, isEnabled])

    useEffect(() => {
        if (isPlayRoundStartSound) {
            playSound(Sounds.RoundStart, true)
        }
    }, [isPlayRoundStartSound, isEnabled])

    useEffect(() => {
        if (isPlayTimerSound) {
            playSound(Sounds.Timer, true)
        }
    }, [isPlayTimerSound, isEnabled])

    useEffect(() => {
        if (isPlayRoundVictorySound) {
            playSound(Sounds.RoundVictory, true)
        }
    }, [isPlayRoundVictorySound, isEnabled])

    useEffect(() => {
        if (isPlayRoundLoseSound) {
            playSound(Sounds.RoundLose, true)
        }
    }, [isPlayRoundLoseSound, isEnabled])

    useEffect(() => {
        if (isPlayGameVictorySound) {
            playSound(Sounds.GameFinishVictory)
        }
    }, [isPlayGameVictorySound, isEnabled])

    useEffect(() => {
        if (isPlayGameLoseSound) {
            playSound(Sounds.GameFinishLose)
        }
    }, [isPlayGameLoseSound, isEnabled])
}
