import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch, actions } from '@apps/bar/data'
import { isWebpSupported } from '@apps/bar/utils'

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

export const Game: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const supported = isWebpSupported()
        const html = document.documentElement

        html.classList.add(supported ? 'webp' : 'no-webp')
    }, [])

    useEffect(() => {
        dispatch(actions.getPlayer())
    }, [dispatch])

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
        </>
    )
}
