import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, actions, selectors } from '@apps/bar/data'
import { isWebpSupported, useFakeActions } from '@apps/bar/utils'

import { StartButton } from '../StartButton'
import { Player } from '../Player'
import { Searching } from '../Searching'
import { Opponent } from '../Opponent'
import { Header } from '../Header'
import { Rounds } from '../Rounds'
import { Defend } from '../Defend'
import { Attack } from '../Attack'
import { GamersDamage } from '../GamersDamage'
import { RoundText } from '../RoundText'
import { AttackButton } from '../AttackButton'
import { ResultPopup } from '../ResultPopup'
import { QuitPopup } from '../QuitPopup'

export const Game: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
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
            <Player />
            <Searching />
            <Opponent />
            <Header />
            <Rounds />
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
