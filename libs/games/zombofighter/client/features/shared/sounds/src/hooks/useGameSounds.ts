import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'

import { Sounds } from '../types'
import * as selectors from '../data/selectors'
import { playSound } from '../utils'

export function useGameSounds() {
    const isEnabled = useSelector(selectors.isEnabled)
    const opponent = useSelector(game.selectors.getOpponent)
    const isStartScene = useSelector(game.selectors.isStartScene)
    const isSearchingScene = useSelector(game.selectors.isSearchingScene)
    const isGameStartScene = useSelector(game.selectors.isGameStartScene)
    const isRoundScene = useSelector(game.selectors.isRoundScene)
    const isRoundVictory = useSelector(game.selectors.isRoundVictory)
    const isRoundLose = useSelector(game.selectors.isRoundLose)
    const isGameVictory = useSelector(game.selectors.isGameVictory)
    const isGameLose = useSelector(game.selectors.isGameLose)
    const timeLeft = useSelector(game.selectors.getTimeLeft)

    useEffect(() => {
        if (isStartScene) {
            playSound(Sounds.Start)
        }
    }, [isStartScene, isEnabled])

    useEffect(() => {
        if (isSearchingScene) {
            playSound(Sounds.Searching)
        }
    }, [isSearchingScene, isEnabled])

    useEffect(() => {
        if (isGameStartScene && opponent) {
            playSound(Sounds.GameStart)
            setTimeout(playSound, 2000, Sounds.GameSession)
        }
    }, [isGameStartScene, opponent, isEnabled])

    useEffect(() => {
        if (isRoundScene) {
            playSound(Sounds.RoundStart, true)
        }
    }, [isRoundScene, isEnabled])

    useEffect(() => {
        if (timeLeft === 3) {
            playSound(Sounds.Timer, true)
        }
    }, [timeLeft, isEnabled])

    useEffect(() => {
        if (isRoundVictory) {
            playSound(Sounds.RoundVictory, true)
        }
    }, [isRoundVictory, isEnabled])

    useEffect(() => {
        if (isRoundLose) {
            playSound(Sounds.RoundLose, true)
        }
    }, [isRoundLose, isEnabled])

    useEffect(() => {
        if (isGameVictory) {
            playSound(Sounds.GameFinishVictory)
        }
    }, [isGameVictory, isEnabled])

    useEffect(() => {
        if (isGameLose) {
            playSound(Sounds.GameFinishLose)
        }
    }, [isGameLose, isEnabled])
}
