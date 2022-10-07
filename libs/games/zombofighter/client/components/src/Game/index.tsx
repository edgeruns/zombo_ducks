import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    actions,
    Actions,
    AppDispatch,
    selectors,
    UserSkins,
} from '@apps/games-zombofighter-client-data'
import {
    isWebpSupported,
    playSound,
    Sounds,
} from '@apps/games-zombofighter-client-utils'

import { StartButton } from '../StartButton'
import { Menu } from '../Menu'
import { Searching } from '../Searching'
import { Player } from '../Player'
import { Opponent } from '../Opponent'
import { Header } from '../Header'
import { Rounds } from '../Rounds'
import { BodyPartsCheckbox } from '../BodyPartsCheckbox'
import { Defend } from '../Defend'
import { Attack } from '../Attack'
import { GamersDamage } from '../GamersDamage'
import { RoundText } from '../RoundText'
import { AttackButton } from '../AttackButton'
import { ResultPopup } from '../ResultPopup'
import { QuitPopup } from '../QuitPopup'
import { TutorialPopup } from '../TutorialPopup'
import { Tutorial } from '../Tutorial'

export const Game: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const opponent = useSelector(selectors.getOpponent)
    const isStartScene = useSelector(selectors.isStartScene)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundVictory = useSelector(selectors.isRoundVictory)
    const isRoundLose = useSelector(selectors.isRoundLose)
    const isGameVictory = useSelector(selectors.isGameVictory)
    const isGameLose = useSelector(selectors.isGameLose)

    useEffect(() => {
        const supported = isWebpSupported()
        const html = document.documentElement

        html.classList.add(supported ? 'webp' : 'no-webp')
    }, [])

    useEffect(() => {
        if (isStartScene) {
            playSound(Sounds.Start)
        }
    }, [isStartScene])

    useEffect(() => {
        if (isGameStartScene && opponent) {
            playSound(Sounds.GameStart)
            setTimeout(playSound, 2000, Sounds.GameSession)
        }
    }, [isGameStartScene, opponent])

    useEffect(() => {
        if (isRoundScene) {
            playSound(Sounds.RoundStart, true)
        }
    }, [isRoundScene])

    useEffect(() => {
        if (isRoundVictory) {
            playSound(Sounds.RoundVictory, true)
        }
    }, [isRoundVictory])

    useEffect(() => {
        if (isRoundLose) {
            playSound(Sounds.RoundLose, true)
        }
    }, [isRoundLose])

    useEffect(() => {
        if (isGameVictory) {
            playSound(Sounds.GameFinishVictory)
        }
    }, [isGameVictory])

    useEffect(() => {
        if (isGameLose) {
            playSound(Sounds.GameFinishLose)
        }
    }, [isGameLose])

    useEffect(() => {
        dispatch(actions.getPlayer())
    }, [dispatch])

    return (
        <>
            <StartButton />
            <Menu />
            <Searching />
            <Player />
            <Opponent />
            <Header />
            <Rounds />
            <BodyPartsCheckbox />
            <Defend />
            <Attack />
            <GamersDamage />
            <RoundText />
            <AttackButton />
            <ResultPopup />
            <QuitPopup />
            <TutorialPopup />
            <Tutorial />
        </>
    )
}
