import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, actions, selectors } from '@apps/bar/data'
import { isWebpSupported, useFakeActions, Sounds, playSound } from '@apps/bar/utils'

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

export const Game: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const opponent = useSelector(selectors.getOpponent)
    const isStartScene = useSelector(selectors.isStartScene)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const isRoundVictory = useSelector(selectors.isRoundVictory)
    const isRoundLose = useSelector(selectors.isRoundLose)
    const isGameVictory = useSelector(selectors.isGameVictory)
    const isGameLose = useSelector(selectors.isGameLose)
    const isTimeExpired = useSelector(selectors.isRoundTimeExpired)
    const roundsCount = useSelector(selectors.getRoundsCount)
    const roundNum = useSelector(selectors.getRoundsNum)

    const { fakeRoundStart, fakeRoundFinish, fakeGameFinish } = useFakeActions()

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

    useEffect(() => {
        if (isTimeExpired && isRoundScene) {
            fakeRoundFinish()
        }
    }, [isTimeExpired, isRoundScene, fakeRoundFinish])

    useEffect(() => {
        if (isRoundFinishScene) {
            setTimeout(fakeRoundStart, 3000)
        }
    }, [isRoundFinishScene, fakeRoundStart])

    useEffect(() => {
        if (roundNum === roundsCount && isRoundFinishScene) {
            setTimeout(fakeGameFinish, 3000)
        }
    }, [roundNum, roundsCount, isRoundFinishScene, fakeGameFinish])

    return (
        <>
            <StartButton />
            <Menu/>
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
        </>
    )
}
