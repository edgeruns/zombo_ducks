import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import user from '@apps/games/zombofighter/client/features/shared/user'
import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import { FeatureDispatch } from '../../data/store.feature'
import * as actions from '../../data/actions'
import * as selectors from '../../data/selectors'
import { Popup } from '../../ui'

export const ResultPopupContainer: FC = () => {
    const dispatch = useDispatch<FeatureDispatch>()

    const isVictory = useSelector(selectors.isVictory)
    const isDraws = useSelector(selectors.isDraws)
    const isLose = useSelector(selectors.isLose)
    const player = useSelector(user.selectors.getUser)
    const profit = useSelector(selectors.getProfit)

    const navigate = useNavigate()

    const handleAgainClick = useCallback(() => {
        playSound(Sounds.Laugh)
        navigate('/game/search')
    }, [navigate])

    const handleCrossClick = useCallback(() => {
        dispatch(actions.reset())
        navigate('/')
    }, [dispatch, navigate])

    return player && (
        <Popup
            isVictory={isVictory}
            isDraws={isDraws}
            isLose={isLose}
            player={player}
            profit={profit}
            onAgainClick={handleAgainClick}
            onCrossClick={handleCrossClick}
        />
    )
}
