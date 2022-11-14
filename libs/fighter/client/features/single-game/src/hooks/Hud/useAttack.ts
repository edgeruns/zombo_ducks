import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../data/actions'
import { MAX_ATTACKS } from '../../data/constants'
import * as selectors from '../../data/selectors'
import { BodyParts } from '../../data/types'

export function useAttack() {
    const dispatch = useDispatch()

    const game = useSelector(selectors.getGame)
    const isGameStart = useSelector(selectors.isGameStart)
    const isActionSended = useSelector(selectors.isActionSended)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const enemyDefences = useSelector(selectors.getEnemyDefences)

    const isMaxAttacks = useMemo(() => {
        return (
            playerAttacks.filter((attack) => attack === 1).length ===
            MAX_ATTACKS
        )
    }, [playerAttacks])

    const isDisabled = isActionSended
    const isVisible = !isGameStart
    const isIconVisible = !isGameStart || !game.isWaiting()
    const selectedParts = playerAttacks

    const defendedParts = useMemo(() => {
        const getDefened = (part: number, index: number) => {
            if (part === 1 && playerAttacks[index] === 1) {
                return 1
            }

            return 0
        }

        return enemyDefences.map(getDefened) as BodyParts
    }, [enemyDefences, playerAttacks])

    const damagedParts = useMemo(() => {
        const getDamaged = (part: number, index: number) => {
            if (part === 0 && playerAttacks[index] === 1) {
                return 1
            }

            return 0
        }

        return defendedParts.map(getDamaged) as BodyParts
    }, [defendedParts, playerAttacks])

    const disabledParts = useMemo(() => {
        const getDisabled = (part: number) => {
            if (isDisabled || (isMaxAttacks && part === 0)) {
                return 1
            }

            return 0
        }

        return playerAttacks.map(getDisabled) as BodyParts
    }, [playerAttacks, isDisabled, isMaxAttacks])

    const darkedParts = useMemo(() => {
        const getDarked = (_: number, index: number) => {
            if (disabledParts[index] === 1 && game.isWaiting()) {
                return 1
            }

            return 0
        }

        return playerAttacks.map(getDarked) as BodyParts
    }, [playerAttacks, disabledParts, game])

    const handleBodyPartClick = useCallback(
        (index: number) => {
            dispatch(actions.selectAttack(index))
        },
        [dispatch]
    )

    return useMemo(() => {
        return {
            isVisible,
            isIconVisible,
            selectedParts,
            defendedParts,
            damagedParts,
            disabledParts,
            darkedParts,
            handleBodyPartClick,
        }
    }, [
        isVisible,
        isIconVisible,
        selectedParts,
        defendedParts,
        damagedParts,
        disabledParts,
        darkedParts,
        handleBodyPartClick,
    ])
}
