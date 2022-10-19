import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BodyParts } from '../../data/types'
import { MAX_DEFENCES } from '../../data/constants'
import * as actions from '../../data/actions'
import * as selectors from '../../data/selectors'

export function useDefend() {
    const dispatch = useDispatch()

    const game = useSelector(selectors.getGame)
    const isGameStart = useSelector(selectors.isGameStart)
    const isActionSended = useSelector(selectors.isActionSended)
    const playerDefences = useSelector(selectors.getPlayerDefences)
    const enemyAttacks = useSelector(selectors.getEnemyAttacks)

    const isMaxDefences = useMemo(() => {
        return playerDefences.filter(defence => defence === 1).length === MAX_DEFENCES
    }, [playerDefences])

    const isDisabled = isActionSended
    const isVisible = !isGameStart
    const isIconVisible = !isGameStart || !game.isWaiting()
    const selectedParts = playerDefences

    const defendedParts = useMemo(() => {
        const getDefened = (part: number, index: number) => {
            if (part === 1 && enemyAttacks[index] === 1) {
                return 1
            }

            return 0
        }

        return playerDefences.map(getDefened) as BodyParts
    }, [playerDefences, enemyAttacks])

    const damagedParts = useMemo(() => {
        const getDamaged = (part: number, index: number) => {
            if (part === 0 && enemyAttacks[index] === 1) {
                return 1
            }

            return 0
        }

        return defendedParts.map(getDamaged) as BodyParts
    }, [defendedParts, enemyAttacks])

    const disabledParts = useMemo(() => {
        const getDisabled = (part: number) => {
            if (isDisabled || (isMaxDefences && part === 0)) {
                return 1
            }

            return 0
        }

        return playerDefences.map(getDisabled) as BodyParts
    }, [playerDefences, isMaxDefences])

    const darkedParts = useMemo(() => {
        const getDarked = (_: number, index: number) => {
            if (disabledParts[index] === 1 && game.isWaiting()) {
                return 1
            }

            return 0
        }

        return playerDefences.map(getDarked) as BodyParts
    }, [playerDefences, disabledParts, game])

    const handleBodyPartClick = useCallback((index: number) => {
        dispatch(actions.selectDefence(index))
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            isIconVisible,
            selectedParts,
            defendedParts,
            damagedParts,
            disabledParts,
            darkedParts,
            handleBodyPartClick
        }
    }, [
        isVisible,
        isIconVisible,
        selectedParts,
        defendedParts,
        damagedParts,
        disabledParts,
        darkedParts,
        handleBodyPartClick
    ])
}
